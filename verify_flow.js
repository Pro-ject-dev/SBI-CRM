
const BASE_URL = 'http://localhost:8001/api/warehouse_manager';

async function testFlow() {
    try {
        console.log("Starting Verification...");

        // Helper for fetch
        const toJson = (res) => res.json();
        const post = (url, data) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(toJson);
        const get = (url) => fetch(url).then(toJson);
        const put = (url, data = {}) => fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(toJson);
        const del = (url) => fetch(url, { method: 'DELETE' }).then(toJson);

        // 1. Create a Material First
        console.log("Fetching materials...");
        const materialsRes = await get(`${BASE_URL}/getConsumableMaterials`);
        let materialId;
        if (materialsRes.success && materialsRes.data && materialsRes.data.length > 0) {
            materialId = materialsRes.data[0].id;
            console.log(`Using existing material ID: ${materialId}`);
        } else {
            console.log("No materials found. Creating one...");
            const newMat = await post(`${BASE_URL}/addConsumableMaterial`, {
                materialName: "Test Material " + Date.now(),
                currentStock: "100",
                minimumStock: "10",
                barcode: "12345678"
            });
            if (newMat.success) {
                materialId = newMat.data.id;
                console.log(`Created material ID: ${materialId}`);
            } else {
                console.log("Failed to create material", newMat);
                return;
            }
        }

        // 2. Create Request
        const requestData = {
            priority: "High",
            requiredDate: "2025-12-25",
            notes: "Test Request",
            requestedBy: "Tester",
            items: [
                { materialId: materialId, materialName: "Test Material", quantity: 5 }
            ]
        };

        console.log("Creating request...");
        const createRes = await post(`${BASE_URL}/addConsumableRequest`, requestData);
        if (!createRes.success) throw new Error(createRes.message);
        const requestId = createRes.data.id;
        console.log(`Request Created. ID: ${requestId}`);

        // 3. Get Request
        console.log("Fetching request...");
        const getRes = await get(`${BASE_URL}/getConsumableRequestById?id=${requestId}`);
        if (getRes.data.items && getRes.data.items.length > 0) {
            console.log("Request items verified.");
        } else {
            console.error("FAILED: Request items missing!");
        }

        // 4. Approve Request
        console.log("Approving request...");
        const approveRes = await put(`${BASE_URL}/approveConsumableRequest?id=${requestId}`);
        if (approveRes.data.status === "Approved") {
            console.log("Request Approved.");
        } else {
            console.error("FAILED: Request not approved.");
        }

        // 5. Fulfill Request
        console.log("Fulfilling request...");
        const fulfillRes = await put(`${BASE_URL}/fulfillConsumableRequest?id=${requestId}`);
        if (fulfillRes.data.status === "Fulfilled") {
            console.log("Request Fulfilled.");
        } else {
            console.error("FAILED: Request not fulfilled.");
        }

        // 6. Verify Stock Deduction
        const materialRes = await get(`${BASE_URL}/getConsumableMaterialById?id=${materialId}`);
        console.log(`Current Stock: ${materialRes.data.currentStock}`);

        console.log("Verification Complete!");

    } catch (error) {
        console.error("Verification Failed:", error);
    }
}

testFlow();

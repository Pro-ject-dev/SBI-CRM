# Database Schema Enhancements Report

## Summary
This report details the new fields added to the existing database models to support enhanced functionality developed during the recent updates. These changes primarily address the need for flexible Tax calculations (IGST vs CGST/SGST) and Inventory tracking (Barcodes).

## 1. Purchase Order Model
**Table**: `purchase_orders`
**File**: `SBI-API/models/purchaseorders.js`

| Field Name | Data Type | Purpose |
| :--- | :--- | :--- |
| **`igst`** | `TEXT` | Stores the Inter-State GST (IGST) percentage. Used when the vendor is outside the home state. |
| **`gstType`** | `TEXT` | Indicates the tax type configuration for the order. <br>Values: `'normal'` (CGST/SGST) or `'central'` (IGST). <br>Default: `'normal'`. |

## 2. Estimation Model
**Table**: `estimation`
**File**: `SBI-API/models/estimation.js`

| Field Name | Data Type | Purpose |
| :--- | :--- | :--- |
| **`taxIgst`** | `STRING` | Stores the IGST component for sales estimations. |
| **`taxType`** | `STRING` | Distinguishes between local and central tax calculation. <br>Values: `'gst'` or `'igst'`. |

## 3. Consumable Materials Model
**Table**: `consumable_materials`
**File**: `SBI-API/models/consumableMaterials.js`

| Field Name | Data Type | Purpose |
| :--- | :--- | :--- |
| **`barcode`** | `TEXT` | Stores the unique barcode string for consumable materials, enabling barcode scanning functionality in the warehouse and admin panels. |

---
**Note**: These changes are reflected in the Sequelize definitions and should be synced with the database using the internal sync mechanism (e.g., `sequelize.sync({ alter: true })`) if not already applied.

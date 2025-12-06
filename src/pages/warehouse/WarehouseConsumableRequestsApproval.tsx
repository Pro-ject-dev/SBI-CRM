import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConsumableRequestsApproval from "../../features/warehouse/ConsumableRequestsApproval";

const WarehouseConsumableRequestsApproval = () => {
  const location = useLocation();

  return (
    <div>
      <ConsumableRequestsApproval />
    </div>
  );
};

export default WarehouseConsumableRequestsApproval;

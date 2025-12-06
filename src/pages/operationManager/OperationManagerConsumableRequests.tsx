import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConsumableRequestsManagement from "../../features/operationManager/ConsumableRequestsManagement";

const OperationManagerConsumableRequests = () => {
  const location = useLocation();

  return (
    <div>
      <ConsumableRequestsManagement />
    </div>
  );
};

export default OperationManagerConsumableRequests;

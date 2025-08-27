import { BarChart2, Building, DollarSign, Package, ShoppingCart,Boxes, Users, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetAllLeadsQuery } from "../../app/api/leadsApi";
import { useGetAllOrdersQuery } from "../../app/api/orderManagementApi";
import { useGetPurchaseOrdersQuery } from "../../app/api/purchaseOrdersApi";
import { useGetRawMaterialsQuery } from "../../app/api/rawMaterialsApi";
import { useGetStandardQuery } from "../../app/api/standardProductApi";
import { useGetVendorsQuery } from "../../app/api/vendorsApi";
import Dashboard from "../../features/dashboard/Dashboard";

const AdminDashboard = () => {
  const { data: leadsData, isLoading: leadsLoading } = useGetAllLeadsQuery();
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery({});
  const { data: purchaseOrdersData, isLoading: poLoading } = useGetPurchaseOrdersQuery();
  const { data: rawMaterialsData, isLoading: rmLoading } = useGetRawMaterialsQuery();
  const { data: productsData, isLoading: productsLoading } = useGetStandardQuery({ });
  const { data: vendorsData, isLoading: vendorsLoading } = useGetVendorsQuery({});

  // Handle different API response structures with proper fallbacks
  const leadsArray = Array.isArray(leadsData) ? leadsData : (leadsData?.data && Array.isArray(leadsData.data) ? leadsData.data : []);
  const ordersArray = Array.isArray(ordersData) ? ordersData : (ordersData?.data && Array.isArray(ordersData.data) ? ordersData.data : []);
  const purchaseOrdersArray = Array.isArray(purchaseOrdersData) ? purchaseOrdersData : (purchaseOrdersData?.data && Array.isArray(purchaseOrdersData.data) ? purchaseOrdersData.data : []);
  const productsArray = Array.isArray(productsData) ? productsData : (productsData?.data && Array.isArray(productsData.data) ? productsData.data : []);

  const totalLeads = leadsArray.length;
  const totalOrders = ordersArray.length;
  const totalPurchaseOrders = purchaseOrdersArray.length;
  const totalProducts = productsArray.length;
  const totalVendors = vendorsData?.data?.length ?? 0;

  // Fixed revenue calculation with proper error handling
  const totalRevenue = ordersArray.reduce((acc: number, order: any) => {
    if (order && order.estimation && order.estimation.grandTotal) {
      const grandTotal = parseInt(String(order.estimation.grandTotal), 10);
      return acc + (isNaN(grandTotal) ? 0 : grandTotal);
    }
    return acc;
  }, 0);

  const recentOrders = ordersArray.slice(0, 5);
  const recentLeads = leadsArray.slice(0, 5);

  // Safe handling of raw materials data
  const lowStockAlerts = (rawMaterialsData?.data && Array.isArray(rawMaterialsData.data)) 
    ? rawMaterialsData.data.filter((material: any) => 
        material && 
        typeof material.currentStock === 'number' && 
        typeof material.minimumStock === 'number' && 
        material.currentStock < material.minimumStock
      )
    : [];

  const orderStatusMap: { [key: number]: string } = {
    1: "New",
    2: "Pending Approval",
    3: "Processing",
    4: "Completed",
    5: "Delayed",
  };

  const statusColors: { [key: number]: string } = {
    1: "bg-blue-50 text-blue-700 border-blue-200",
    2: "bg-amber-50 text-amber-700 border-amber-200",
    3: "bg-indigo-50 text-indigo-700 border-indigo-200",
    4: "bg-emerald-50 text-emerald-700 border-emerald-200",
    5: "bg-red-50 text-red-700 border-red-200",
  };

  const kpiData = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <DollarSign size={20} className="text-white" />,
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      change: "+12.5%",
      changeType: "positive"
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingCart size={20} className="text-white" />,
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      change: "+8.2%",
      changeType: "positive"
    },
    {
      title: "Active Leads",
      value: totalLeads,
      icon: <Users size={20} className="text-white" />,
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+5%",
      changeType: "positive"
    },
    {
      title: "Products",
      value: totalProducts,
      icon: <Package size={20} className="text-white" />,
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+5.1%",
      changeType: "positive"
    },
    {
      title: "Vendors",
      value: totalVendors,
      icon: <Building size={20} className="text-white" />,
      color: "from-red-500 to-red-600",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      change: "+2.8%",
      changeType: "positive"
    },
    {
      title: "Purchase Orders",
      value: totalPurchaseOrders,
      icon: <BarChart2 size={20} className="text-white" />,
      color: "from-yellow-500 to-yellow-600",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: "+18.7%",
      changeType: "positive"
    },
  ];

  // Loading skeleton component
  const LoadingSkeleton = ({ count = 1 }: { count?: number }) => (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-200 rounded-lg p-6 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <Dashboard title="Admin Dashboard">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back! 👋</h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your business today.</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {kpiData.map((kpi, index) => (
          <div key={index} className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                  <div className="flex items-center space-x-1 text-xs">
                    <TrendingUp size={12} className="text-emerald-500" />
                    <span className="text-emerald-600 font-medium">{kpi.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mt-2 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {kpi.value}
                </h3>
              </div>
              <div className={`bg-gradient-to-r ${kpi.color} p-3 rounded-xl shadow-sm`}>
                {kpi.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link to="/admin/orders" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View all →
              </Link>
            </div>
          </div>
          <div className="p-6">
            {ordersLoading ? (
              <LoadingSkeleton count={3} />
            ) : (
              <div className="space-y-4">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <ShoppingCart size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {order.estimation?.customerName || 'Unknown Customer'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ₹ {Number(order.estimation?.grandTotal || 0).toLocaleString()}
                        </p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[order.orderStatus] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
                          {orderStatusMap[order.orderStatus] || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No recent orders found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
              <Link to="/admin/leads" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View all →
              </Link>
            </div>
          </div>
          <div className="p-6">
            {leadsLoading ? (
              <LoadingSkeleton count={3} />
            ) : (
              <div className="space-y-4">
                {recentLeads.length > 0 ? (
                  recentLeads.map((lead: any) => (
                    <div key={lead.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-medium text-sm">
                        {(lead.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{lead.name || 'Unknown Lead'}</p>
                        <p className="text-sm text-gray-500">{lead.company || 'No company'}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Users size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No recent leads found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockAlerts.length > 0 && (
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-red-50">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={20} className="text-red-600" />
              <h2 className="text-lg font-semibold text-red-900">Low Stock Alerts</h2>
              <span className="bg-red-200 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {lowStockAlerts.length}
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lowStockAlerts.map((material: any) => (
                <div key={material.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <Package size={16} className="text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{material.name || 'Unknown Material'}</p>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-red-600 font-semibold">
                          Current: {material.currentStock || 0} {material.unit || 'units'}
                        </span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-600">
                          Min: {material.minimumStock || 0} {material.unit || 'units'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link 
                    to="/warehouse/raw-materials" 
                    className="text-red-600 hover:text-red-700 font-medium text-sm bg-white px-3 py-1.5 rounded-lg border border-red-200 hover:border-red-300 transition-colors"
                  >
                    Restock
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-sm text-gray-600 mt-1">Frequently used functions for faster access</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { to: "/admin/master-form", title: "Manage Product", icon: Boxes, color: "from-blue-500 to-blue-600", hoverColor: "hover:from-blue-600 hover:to-blue-700" },
              { to: "/admin/orders", title: "Manage Order", icon: ShoppingCart, color: "from-emerald-500 to-emerald-600", hoverColor: "hover:from-emerald-600 hover:to-emerald-700" },
              { to: "/admin/leads", title: "Manage Leads", icon: Users, color: "from-purple-500 to-purple-600", hoverColor: "hover:from-purple-600 hover:to-purple-700" },
              { to: "/admin/purchase-orders-approval", title: "Manage POs", icon: BarChart2, color: "from-orange-500 to-orange-600", hoverColor: "hover:from-orange-600 hover:to-orange-700" },
            ].map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link 
                  key={index}
                  to={action.to} 
                  className={`group bg-gradient-to-r ${action.color} ${action.hoverColor} text-white text-center py-6 px-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5`}
                >
                  <IconComponent size={24} className="mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="block text-sm font-medium">{action.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default AdminDashboard;

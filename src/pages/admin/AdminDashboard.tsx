import { BarChart2, Calendar, MessageSquare, Users } from "lucide-react";
import Dashboard from "../../features/dashboard/Dashboard";

const AdminDashboard = () => {
  return (
    <Dashboard title="Admin">
      <div className="mb-6 flex justify-start">
        <p className="text-gray-600">
          Welcome back, Alex. Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: "Total Deals",
            value: "1,284",
            change: "+12.5%",
            color: "bg-blue-500",
          },
          {
            title: "Active Deals",
            value: "42",
            change: "+3.8%",
            color: "bg-green-500",
          },
          {
            title: "Monthly Revenue",
            value: "$35,723",
            change: "+7.2%",
            color: "bg-purple-500",
          },
          {
            title: "Pending Deals",
            value: "18",
            change: "-2.5%",
            color: "bg-orange-500",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.color} p-2 rounded-lg`}>
                <BarChart2 size={20} className="text-white" />
              </div>
            </div>
            <div
              className={`mt-2 text-xs font-medium ${
                stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change} from last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      {item % 2 === 0 ? (
                        <MessageSquare className="text-blue-600" size={20} />
                      ) : (
                        <Users className="text-blue-600" size={20} />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">
                        {item % 2 === 0
                          ? "New comment on deal"
                          : "Customer follow-up scheduled"}
                      </h3>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {item % 2 === 0
                        ? "Jane Smith commented on the deal with Acme Corp."
                        : "Reminder: Call ABC Industries about renewal."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View all activities
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  title: "Client Meeting",
                  time: "11:00 AM",
                  with: "Global Tech Inc.",
                },
                {
                  title: "Project Review",
                  time: "2:30 PM",
                  with: "Marketing Team",
                },
                {
                  title: "Product Demo",
                  time: "Tomorrow, 10:00 AM",
                  with: "New Prospects",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-start p-3 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 mr-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Calendar size={18} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{event.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {event.time} • {event.with}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition">
                + Add new event
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default AdminDashboard;

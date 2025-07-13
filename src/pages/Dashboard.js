import Sidebar from '../components/Sidebar';

const Dashboard = () => (
  <div className="flex">
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-6">Welcome to your Asset Manager Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="font-semibold">Portfolio Value</p>
          <p className="text-lg">$3,000,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="font-semibold">Active Proposals</p>
          <p className="text-lg">4</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="font-semibold">Recent Reports</p>
          <p className="text-lg">2 this month</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="font-semibold mb-4">Quick Stats</p>
        <ul className="space-y-2">
          <li className="flex justify-between border-b pb-2">Top Holding <span>Loading...</span></li>
          <li className="flex justify-between border-b pb-2">Best Performer <span>Loading...</span></li>
          <li className="flex justify-between">Worst Performer <span>Loading...</span></li>
        </ul>
      </div>
    </div>
  </div>
);

export default Dashboard;





export default function Dashboard() {

    return (
       <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Welcome back!</h2>
          <p className="text-gray-600">Here's your dashboard overview.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <p className="text-gray-600">Your latest actions and updates.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
          <p className="text-gray-600">Key metrics at a glance.</p>
        </div>
      </div>
    </div>
    )
}
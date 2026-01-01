import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // button loading

  // ✅ Login check from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const token = localStorage.getItem("userToken");

    if (userData && token) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // ✅ Hardcoded restaurant (testing ke liye perfect)
  const restaurant = {
    _id: "69557a058e2829b23e22bd99",
    name: "Flavour Junction",
    menu: [
      {
        _id: "69557a058e2829b23e22aa01",
        name: "Paneer Butter Masala",
        price: 250,
      },
      {
        _id: "69557a058e2829b23e22aa02",
        name: "Veg Biryani",
        price: 200,
      },
      {
        _id: "69557a058e2829b23e22aa03",
        name: "Butter Naan",
        price: 50,
      },
      {
        _id: "69557a058e2829b23e22aa04",
        name: "Cold Drink",
        price: 60,
      },
    ],
  };

  // ✅ Buy Now with loading state + better feedback
  const handleBuyNow = async (item) => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData?._id || null; // safe access

      const res = await fetch("http://localhost:5000/api/orders/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          restaurantId: restaurant._id,
          items: [
            {
              itemId: item._id,
              quantity: 1,
            },
          ],
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(` ${item.name} ordered successfully!`);
        console.log("Order Details:", data.order);
      } else {
        toast.error(data.message || "Order failed");
      }
    } catch (err) {
      toast.error("Network error – Check if backend is running");
      console.error("BuyNow Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#d35400" }}>🍛 Flavour Junction</h1>
      <h2>
        Welcome, <strong>{user?.name || "Guest User"}</strong> 👋
      </h2>

      {user && (
        <p style={{ color: "green", fontSize: "14px" }}>
          Logged in as: {user.email}
        </p>
      )}

      <hr style={{ margin: "20px 0" }} />

      <h3>Menu</h3>
      <div style={{ display: "grid", gap: "20px", marginTop: "20px" }}>
        {restaurant.menu.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0" }}>{item.name}</h3>
            <p style={{ margin: "5px 0", fontSize: "18px", fontWeight: "bold" }}>
              ₹{item.price}
            </p>
            <button
              onClick={() => handleBuyNow(item)}
              disabled={loading}
              style={{
                padding: "10px 20px",
                backgroundColor: "#e67e22",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              {loading ? "Placing Order..." : "Buy Now "}
            </button>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Dashboard;
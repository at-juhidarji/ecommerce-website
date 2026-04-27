import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// ─────────────────────────────────────────────
// Orders Page
// ─────────────────────────────────────────────

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  
  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 py-8 flex justify-between items-center">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            YOUR <span className="text-primary">ORDER</span>
          </h1>

          <span className="text-sm text-muted-foreground">
            {filteredOrders.length} orders
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
        {/* Breadcrumb */}
        <Breadcrumb className="text-sm text-muted-foreground">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground">
                Orders
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* 🔍 Search */}
        <Input
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg font-medium text-foreground">
              No orders found
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Try searching a different order
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onView={() => setSelectedOrder(order)}
            />
          ))
        )}
      </div>

      {/* 🧾 Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Order Card
// ─────────────────────────────────────────────

const OrderCard = ({ order, onView }) => {
  const firstItem = order.items?.[0];

  return (
    <Card className="border border-border">
      <CardContent className="p-4 space-y-3">
        {/* Top Row */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{order.date}</span>

          <span className="font-semibold text-foreground">
            ₹{order.total.toLocaleString()}
          </span>
        </div>

        {/* Middle Row */}
        <div className="flex justify-between items-center gap-4">
          {/* Product */}
          <div className="flex items-center gap-3">
            {firstItem && (
              <img
                src={firstItem.image}
                alt={firstItem.name}
                className="w-14 h-14 object-cover rounded-md border"
              />
            )}

            <div>
              <p className="text-sm font-medium text-foreground">
                {firstItem?.name || "Product"}
              </p>

              <p className="text-xs text-muted-foreground">
                {order.items.length} item{order.items.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button size="sm" variant="secondary" onClick={onView}>
              View Order
            </Button>

            <Button size="sm" variant="outline">
              Track Package
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex ">
          <Button size="sm">Buy Again</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// ─────────────────────────────────────────────
// Modal
// ─────────────────────────────────────────────

const OrderModal = ({ order, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-surface p-6 rounded-md w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-2">{order.id}</h2>

        <p className="text-sm text-muted-foreground mb-4">{order.date}</p>

        <div className="space-y-2">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>

        <div className="mt-4 text-right">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

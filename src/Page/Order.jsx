import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { EyeIcon, RefreshCwIcon } from "lucide-react";

// ─────────────────────────────────────────────
// Orders Page
// ─────────────────────────────────────────────

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(stored);
  }, []);

  const filtered = orders
    .filter((o) => {
      const matchFilter = activeFilter === "all" || o.status === activeFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.items.some((i) => i.name.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    })
    .sort((a, b) => {
      const da = new Date(a.date);
      const db = new Date(b.date);
      return sortAsc ? da - db : db - da;
    });

  const totalSpent = orders.reduce((a, o) => a + o.total, 0);
  const inProgress = orders.filter((o) => o.status === "processing").length;

  const FILTERS = ["all", "delivered", "processing", "cancelled"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 pt-5 pb-4">
          {/* Title row */}
          <div className="flex justify-between items-end gap-2 flex-wrap pb-4">
            <div>
              <h1 className="text-[clamp(26px,6vw,40px)] font-black tracking-tight leading-none">
                YOUR <span className="text-primary">ORDERS</span>
              </h1>

            </div>
            <span className="text-xs text-muted-foreground bg-muted border border-border px-3 py-1 rounded-full shrink-0">
              {filtered.length} order{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Filter pills */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border shrink-0 transition-all cursor-pointer
                  ${activeFilter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground"
                  }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-3 sm:px-8 py-4 space-y-3">

        {/* Summary */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { val: orders.length, lbl: "Total orders" },
            { val: `₹${totalSpent.toLocaleString()}`, lbl: "Total spent" },
            { val: inProgress, lbl: "In progress" },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-[clamp(15px,3.5vw,20px)] font-extrabold text-primary leading-none">
                {val}
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">{lbl}</div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-1 min-w-0">
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 stroke-muted-foreground pointer-events-none"
              viewBox="0 0 24 24" fill="none" strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <Input
              placeholder="Search by order ID or product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 text-sm h-9"
            />
          </div>
          <button
            onClick={() => setSortAsc((p) => !p)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground bg-card border border-border px-3 h-9 rounded-md shrink-0 hover:border-primary hover:text-foreground transition-all cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="9" y1="18" x2="15" y2="18" />
            </svg>
            {sortAsc ? "Oldest" : "Newest"}
          </button>
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm font-medium text-foreground">No orders found</p>
            <p className="text-xs text-muted-foreground mt-1">Try a different search or filter</p>
          </div>
        ) : (
          filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              expanded={expandedId === order.id}
              onToggle={() => setExpandedId(expandedId === order.id ? null : order.id)}
              onView={() => setSelectedOrder(order)}
            />
          ))
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Status Badge
// ─────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const styles = {
    delivered: "text-success bg-success/10 border-success/25",
    processing: "text-warning bg-warning/10 border-warning/25",
    cancelled: "text-destructive bg-destructive/10 border-destructive/20",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border shrink-0 ${styles[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ─────────────────────────────────────────────
// Order Card
// ─────────────────────────────────────────────

const OrderCard = ({ order, expanded, onToggle, onView }) => {
  const shown = order.items.slice(0, 2);
  const extraCount = order.items.length - 2;

  return (
    <div
      className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer transition-all hover:border-primary hover:shadow-[0_0_0_3px_hsl(var(--primary)/0.08)]"
      onClick={onToggle}
    >
      {/* Top */}
      <div className="p-6">
        <div className="flex justify-between items-start gap-2 mb-2.5">
          <div>
            <div className="text-xs font-bold text-muted-foreground tracking-wide">{order.id}</div>
            <div className="text-[11px] text-muted-foreground opacity-70 mt-0.5">{order.date}</div>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="flex items-center gap-6 pb-3">
          {/* Thumbnails */}
          <div className="flex shrink-0">
            {shown.map((item, i) => (
              <div
                key={i}
                className="w-11 h-11 rounded-md bg-muted border border-border flex items-center justify-center text-lg"
                style={{ marginLeft: i > 0 ? "-8px" : 0 }}
              >
                {item.emoji || (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                )}
              </div>
            ))}
            {extraCount > 0 && (
              <div
                className="w-11 h-11 rounded-md bg-secondary border border-border flex items-center justify-center text-[11px] font-semibold text-muted-foreground"
                style={{ marginLeft: "-8px" }}
              >
                +{extraCount}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">
              {order.items[0].name}
              {order.items.length > 1 && ` +${order.items.length - 1} more`}
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">
              {order.items.length} item{order.items.length > 1 ? "s" : ""} · tap to {expanded ? "collapse" : "expand"}
            </div>
          </div>

          {/* Price */}
          <div className="text-[clamp(13px,3vw,16px)] font-extrabold text-primary shrink-0">
            ₹{order.total.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Footer actions */}
      {/* Footer actions */}
<div
  className="flex gap-1.5 flex-wrap px-3.5 py-2.5 border-t border-border bg-muted"
  onClick={(e) => e.stopPropagation()}
>
  {/* View */}
  <Button size="sm" onClick={onView}>
    <EyeIcon />
    View
  </Button>

  {/* Track */}
  {order.status === "processing" && (
    <Button size="sm" variant="outline">
      <TruckIcon />
      Track
    </Button>
  )}

  {/* Buy again */}
  <Button size="sm" variant="secondary">
    <RefreshCwIcon/>
    Buy again
  </Button>

  {/* Return */}
  {order.status === "delivered" && (
    <Button size="sm" variant="ghost">
      <ReturnIcon />
      Return
    </Button>
  )}

  {/* Refund */}
  {order.status === "cancelled" && (
    <Button size="sm" variant="destructive">
      <ShieldIcon />
      Refund
    </Button>
  )}
</div>

      {/* Expanded */}
      {expanded && <ExpandedBody order={order} />}
    </div>
  );
};

// ─────────────────────────────────────────────
// Expanded Body
// ─────────────────────────────────────────────

const ExpandedBody = ({ order }) => (
  <div className="border-t border-border px-3.5 py-3 bg-muted space-y-3 animate-in fade-in slide-in-from-top-1 duration-150">
    {/* Timeline */}
    <div>
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tracking</p>
      <div className="flex items-start">
        {order.timeline.map((step, i) => {
          const state = step.done ? "done" : step.active ? "active" : "pending";
          return (
            <div key={i} className="flex-1 flex flex-col items-center relative">
              {i < order.timeline.length - 1 && (
                <div className={`absolute top-[11px] left-1/2 w-full h-[1.5px] ${state === "done" ? "bg-primary" : "bg-border"}`} />
              )}
              <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center z-10 shrink-0
                ${state === "done" ? "bg-primary" : state === "active" ? "bg-warning/15 border-[1.5px] border-warning" : "bg-secondary border-[1.5px] border-border"}`}>
                {state === "done" ? (
                  <svg className="w-2.5 h-2.5 stroke-primary-foreground" viewBox="0 0 24 24" fill="none" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  <div className={`w-1.5 h-1.5 rounded-full ${state === "active" ? "bg-warning" : "bg-muted-foreground/30"}`} />
                )}
              </div>
              <span className={`text-[9px] mt-1 text-center leading-tight
                ${state === "done" ? "text-primary font-semibold" : state === "active" ? "text-warning font-semibold" : "text-muted-foreground"}`}>
                {step.l}
              </span>
            </div>
          );
        })}
      </div>
    </div>

    {/* Items breakdown */}
    <div>
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Items</p>
      <div className="space-y-1.5">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between items-center text-xs gap-2">
            <span className="text-muted-foreground truncate">{item.emoji} {item.name} ×{item.qty}</span>
            <span className="font-medium shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between items-center text-xs border-t border-border pt-1.5 gap-2">
          <span className="font-semibold">Total paid</span>
          <span className="font-extrabold text-primary text-sm">₹{order.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// Order Modal
// ─────────────────────────────────────────────

const OrderModal = ({ order, onClose }) => (
  <div
    className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-16"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    onKeyDown={(e) => e.key === "Escape" && onClose()}
  >
    <div
      className="bg-card border border-border rounded-lg w-full max-w-sm overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-start gap-3 px-4 py-3 border-b border-border">
        <div>
          <h2 className="text-sm font-bold">{order.id}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">{order.date}</span>
            <StatusBadge status={order.status} />
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground bg-secondary border border-border px-2 py-1 rounded-md hover:text-foreground transition-colors cursor-pointer"
        >✕</button>
      </div>

      {/* Items */}
      <div className="px-4 py-3 space-y-0">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-6 py-2 border-b border-border last:border-none">
            <div className="w-9 h-9 rounded-md bg-muted border border-border flex items-center justify-center text-base shrink-0">
              {item.emoji || <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{item.name}</p>
              <p className="text-[11px] text-muted-foreground">Qty: {item.qty}</p>
            </div>
            <p className="text-xs font-semibold shrink-0">₹{(item.price * item.qty).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-muted">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground font-medium">Total paid</span>
          <span className="text-lg font-extrabold text-primary">₹{order.total.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
          <Button size="sm">Download invoice</Button>
        </div>
      </div>
    </div>
  </div>
);



export default OrdersPage;
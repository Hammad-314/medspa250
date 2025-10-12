"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  CreditCard,
  Plus,
  Minus,
  Trash2,
  Calculator,
  Receipt,
  User,
  Clock,
} from "lucide-react";

// Mock services and products
const services = [
  { id: "1", name: "Botox Injections", price: 450, category: "Injectable", duration: 45 },
  { id: "2", name: "Dermal Fillers - Lip", price: 380, category: "Injectable", duration: 30 },
  { id: "3", name: "Dermal Fillers - Cheek", price: 520, category: "Injectable", duration: 45 },
  { id: "4", name: "Hydrafacial", price: 180, category: "Facial", duration: 60 },
  { id: "5", name: "Hydrafacial + LED", price: 220, category: "Facial", duration: 75 },
  { id: "6", name: "PRP Microneedling", price: 320, category: "Treatment", duration: 90 },
  { id: "7", name: "Chemical Peel", price: 150, category: "Treatment", duration: 45 },
  { id: "8", name: "IV Therapy - Hydration", price: 120, category: "Wellness", duration: 30 },
  { id: "9", name: "IV Therapy - Beauty", price: 180, category: "Wellness", duration: 45 },
];

const products = [
  { id: "1", name: "Vitamin C Serum", price: 85, category: "Skincare" },
  { id: "2", name: "Retinol Cream", price: 120, category: "Skincare" },
  { id: "3", name: "Sunscreen SPF 50", price: 45, category: "Skincare" },
  { id: "4", name: "Lip Balm - Recovery", price: 25, category: "Recovery" },
  { id: "5", name: "Face Mask Set", price: 60, category: "Treatment" },
];

export function PaymentPOS({ onPageChange }) {
  const [cart, setCart] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [discountType, setDiscountType] = useState("none");
  const [discountValue, setDiscountValue] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const addToCart = (item, type) => {
    setCart((prev) => {
      const existing = prev.find(
        (cartItem) => cartItem.id === item.id && cartItem.type === type
      );
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id && cartItem.type === type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1, type }];
    });
  };

  const removeFromCart = (id, type) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.type === type)));
  };

  const updateQuantity = (id, type, change) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.type === type) {
            const newQuantity = Math.max(0, item.quantity + change);
            return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount =
    discountType === "percentage"
      ? (subtotal * discountValue) / 100
      : discountType === "amount"
      ? discountValue
      : 0;
  const taxRate = 0.0875;
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const total = subtotal - discountAmount + taxAmount + tipAmount;

  const handleCheckout = () => {
    alert("Payment processed successfully!");
    setCart([]);
    setSelectedClient("");
    setDiscountType("none");
    setDiscountValue(0);
    setTipAmount(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Point of Sale</h1>
          <p className="text-muted-foreground">
            Process payments and manage transactions
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-border hover:bg-primary/5 hover:border-primary/30"
          >
            <Receipt className="mr-2 h-4 w-4" />
            View Receipts
          </Button>
          <Button
            variant="outline"
            className="border-border hover:bg-primary/5 hover:border-primary/30"
          >
            <Clock className="mr-2 h-4 w-4" />
            Transaction History
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services & Products */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Services & Products</CardTitle>
              <CardDescription>
                Select items to add to the transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="services">
                <TabsList className="grid w-full grid-cols-2 bg-muted">
                  <TabsTrigger
                    value="services"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Services
                  </TabsTrigger>
                  <TabsTrigger
                    value="products"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    Products
                  </TabsTrigger>
                </TabsList>

                {/* Services Tab */}
                <TabsContent value="services" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 border border-border rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground">{service.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {service.category}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {service.duration} minutes
                            </p>
                            <p className="text-lg font-semibold mt-2 text-foreground">
                              ${service.price}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToCart(service, "service")}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* Products Tab */}
                <TabsContent value="products" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 border border-border rounded-lg hover:bg-muted/50 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <p className="text-lg font-semibold mt-2 text-foreground">
                              ${product.price}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToCart(product, "product")}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Select Client</Label>
                  <Select value={selectedClient} onValueChange={setSelectedClient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose client..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emma">Emma Johnson</SelectItem>
                      <SelectItem value="sarah">Sarah Davis</SelectItem>
                      <SelectItem value="jessica">Jessica Martinez</SelectItem>
                      <SelectItem value="amanda">Amanda Wilson</SelectItem>
                      <SelectItem value="walk-in">Walk-in Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <User className="mr-2 h-4 w-4" />
                  Add New Client
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transaction Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transaction Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center p-8 text-muted-foreground">
                    <Calculator className="mx-auto h-12 w-12 mb-4" />
                    <p>No items in cart</p>
                    <p className="text-sm">Add services or products to begin</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={`${item.id}-${item.type}`}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            ${item.price} each
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.type, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.type, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id, item.type)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Adjustments */}
          {cart.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Adjustments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Discount</Label>
                  <div className="flex space-x-2">
                    <Select value={discountType} onValueChange={setDiscountType}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="percentage">%</SelectItem>
                        <SelectItem value="amount">$</SelectItem>
                      </SelectContent>
                    </Select>
                    {discountType !== "none" && (
                      <Input
                        type="number"
                        placeholder="0"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(Number(e.target.value))}
                      />
                    )}
                  </div>
                </div>

                <div>
                  <Label>Tip Amount</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="0"
                      value={tipAmount}
                      onChange={(e) => setTipAmount(Number(e.target.value))}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTipAmount(subtotal * 0.18)}
                    >
                      18%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTipAmount(subtotal * 0.2)}
                    >
                      20%
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Payment Summary */}
          {cart.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax (8.75%):</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  {tipAmount > 0 && (
                    <div className="flex justify-between">
                      <span>Tip:</span>
                      <span>${tipAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div>
                  <Label>Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="gift-card">Gift Card</SelectItem>
                      <SelectItem value="package">Package Credit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={!selectedClient}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Process Payment
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

"use client"

import { useState } from "react"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

export function CheckoutForm() {
  const [country, setCountry] = useState<"indonesia" | "malaysia" | "singapore">("indonesia");

  return (
    <form className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-medium">Contact</h2>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail address</Label>
          <Input id="email" name="email" type="email" required />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-medium">Shipping address</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select
              defaultValue={country}
              onValueChange={(value: "indonesia" | "malaysia" | "singapore") => setCountry(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="indonesia">Indonesia</SelectItem>
                <SelectItem value="malaysia">Malaysia</SelectItem>
                <SelectItem value="singapore">Singapore</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" name="fullName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" name="fullName" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" name="fullName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" name="fullName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP code</Label>
            <Input id="zipCode" name="zipCode" required />
          </div>
        </div>
      </div>
    </form>
  )
}



"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Briefcase, User, AtSign, Phone, Lock, Settings, MapPin, Clock, Award, Image, DollarSign, Users, FileText, CreditCard } from 'lucide-react'
import { DetailSignUpSchema, type DetailSignUpFormData } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export function DetailForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<DetailSignUpFormData>({
    resolver: zodResolver(DetailSignUpSchema),
    defaultValues: {
      businessName: "",
      ownerName: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      serviceType: "Venue",
      locationsServed: "",
      experience: 0,
      teamSize: 1,
      registrationNumber: "",
      termsAccepted: false,
    },
  })

  const onSubmit = async (data: DetailSignUpFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', data)
    // Handle successful submission (e.g., redirect, show success message)
  }

  return (
    <div className="w-[900px] bg-gradient-to-br from-yellow-50 via-white to-yellow-100 shadow-2xl rounded-lg p-10">
      <h1 className="text-4xl font-bold text-yellow-800 mb-8 text-center uppercase tracking-widest">Signup Form</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="relative p-6 bg-white rounded-lg border border-neutral-200 shadow-md">
            <h2 className="absolute -top-4 bg-yellow-100 px-4 py-1 rounded-full text-lg font-medium text-yellow-800 tracking-wide">
              Basic Information
            </h2>
            <div className="space-y-5 pt-8">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" placeholder="What is the name of your business or service?" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner's Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" placeholder="What is your full name?" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" placeholder="Choose a unique username" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" type="email" placeholder="What is your business email?" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" type="tel" placeholder="What is your contact number?" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input
                          className="pl-10"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input
                          className="pl-10"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="relative p-6 bg-white rounded-lg border border-neutral-200 shadow-md">
            <h2 className="absolute -top-4 bg-yellow-100 px-4 py-1 rounded-full text-lg font-medium text-yellow-800 tracking-wide">
              Business Details
            </h2>
            <div className="space-y-5 pt-8">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type of Service</FormLabel>
                    <div className="relative">
                      <Settings className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select a service type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Venue">Venue</SelectItem>
                          <SelectItem value="Catering">Catering</SelectItem>
                          <SelectItem value="Decorations">Decorations</SelectItem>
                          <SelectItem value="Photography">Photography</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locationsServed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location(s) Served</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" placeholder="Which locations do you serve for weddings?" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (years)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" type="number" placeholder="How many years of experience do you have?" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="certifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certifications or Licenses (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" type="file" {...field} value={undefined} onChange={(e) => field.onChange(e.target.files)} />
                      </div>
                    </FormControl>
                    <FormDescription>Upload any relevant certifications or licenses.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="relative p-6 bg-white rounded-lg border border-neutral-200 shadow-md">
            <h2 className="absolute -top-4 bg-yellow-100 px-4 py-1 rounded-full text-lg font-medium text-yellow-800 tracking-wide">
              Additional Information
            </h2>
            <div className="space-y-5 pt-8">
              <FormField
                control={form.control}
                name="portfolio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio or Gallery</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" type="file" multiple {...field} value={undefined} onChange={(e) => field.onChange(e.target.files)} />
                      </div>
                    </FormControl>
                    <FormDescription>Upload photos or videos of your past work.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packagesAndPricing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Packages and Pricing</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 text-yellow-500" />
                        <Textarea className="pl-10" placeholder="Do you have any pre-set packages? Provide details of your pricing structure." {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Size (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" type="number" placeholder="How large is your team?" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="relative p-6 bg-white rounded-lg border border-neutral-200 shadow-md">
            <h2 className="absolute -top-4 bg-yellow-100 px-4 py-1 rounded-full text-lg font-medium text-yellow-800 tracking-wide">
              Legal and Payment Information
            </h2>
            <div className="space-y-5 pt-8">
              <FormField
                control={form.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Registration Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" placeholder="Provide your business registration number or ID." {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taxInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Information</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500" />
                        <Input className="pl-10" placeholder="Include your tax identification number (if applicable)." {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Details</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 text-yellow-500" />
                        <Textarea className="pl-10" placeholder="What payment methods do you accept? (e.g., Bank Transfer, UPI, Credit Cards)" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the <a href="#" className="text-yellow-600 underline">terms and conditions</a> and <a href="#" className="text-yellow-600 underline ml-1">privacy policy</a>.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-600 text-white font-semibold rounded-full p-3 text-xl uppercase tracking-wide hover:bg-yellow-700 hover:scale-105 transition duration-300"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  )
}


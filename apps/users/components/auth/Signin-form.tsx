import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from 'lucide-react'
import { signInSchema, type SignInFormData } from "@/lib/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Form submitted:', data)
    // Handle successful submission (e.g., redirect, show success message)
  }

  return (
    <div className="mx-auto max-w-md space-y-6 px-12 border rounded-lg shadow-lg py-8">
      <div className="space-y-4 text-center">
        <Avatar className="mx-auto h-24 w-24 -mt-20 border shadow-lg">
          <AvatarImage src="https://img.freepik.com/vector-premium/avatar-hombre-sonriente-joven-hombre-bigote-barba-marron-cabello-sueter-amarillo-o-sudadera-ilustracion-personaje-personas-vector-3d-estilo-minimalista-dibujos-animados_365941-860.jpg?w=2000" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Please enter your login credentials to access your account.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="yourname@example.com"
                    {...field}
                  />
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
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
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
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#B8860B] hover:bg-[#9A7009]"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Signing in..." : "Login"}
          </Button>

          <div className="text-center">
            <a
              href="/forgot-password"
              className="text-sm text-muted-foreground hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            or login with
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => console.log('Google login')}
        >
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => console.log('Apple login')}
        >
          <img src="https://logosmarcas.net/wp-content/uploads/2020/04/Apple-Logo.png" alt="Apple" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => console.log('Facebook login')}
        >
          <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" />
        </Button>
      </div>

      <div className="text-center text-sm">
        New user?{" "}
        <a href="/signup" className="text-[#B8860B] hover:underline">
          Sign up
        </a>
      </div>
    </div>
  )
}


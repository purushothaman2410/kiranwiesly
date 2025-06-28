
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { 
  InputOTP, 
  InputOTPGroup, 
  InputOTPSlot 
} from '@/components/ui/input-otp';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [otpResending, setOtpResending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loginType, setLoginType] = useState<'user' | 'admin'>('user');
  const location = useLocation();

  const from = location.state?.from?.pathname || '/auth-redirect';

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
  };


  return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-8">
        <div className="w-full max-w-md">
          {statusMessage && (
            <div className="mb-4 text-green-600 text-center font-medium">
              {statusMessage}
            </div>
          )}
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">
                {showOTP ? 'Verify Login' : 'Welcome back'}
              </CardTitle>
              <CardDescription>
                {showOTP 
                  ? 'Enter the verification code sent to your email' 
                  : 'Enter your credentials to access your account'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showOTP ? (
                <div className="space-y-4">
                  <div className="flex justify-center my-4">
                    <InputOTP 
                      maxLength={6} 
                      value={otpValue}
                      onChange={(value) => setOtpValue(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <Button 
                    className="w-full" 
                    disabled={isLoading || otpValue.length !== 6}
                  >
                    {isLoading ? "Verifying..." : "Verify and Login"}
                  </Button>

                  <div className="mt-4 flex justify-between items-center">
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setShowOTP(false);
                        setOtpValue("");
                        setStatusMessage(null);
                      }}
                      className="p-0"
                    >
                      Go back
                    </Button>
                    
                    <Button
                      variant="ghost"
                      disabled={otpResending}
                      size="sm"
                    >
                      {otpResending ? "Sending..." : "Resend OTP"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h1>Login</h1>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  placeholder="email@example.com" 
                                  className="pl-10" 
                                  {...field} 
                                />
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
                            <div className="flex items-center justify-between">
                              <FormLabel>Password</FormLabel>
                            </div>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  className="pl-10"
                                  {...field}
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-0 top-0 h-full px-3"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                  <span className="sr-only">
                                    {showPassword ? "Hide password" : "Show password"}
                                  </span>
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
  );
};

export default Login;
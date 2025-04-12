import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertUserSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

// Extended schema with password confirmation
const extendedUserSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type UserFormData = z.infer<typeof extendedUserSchema>;

const SignUpPage = () => {
  const [activeTab, setActiveTab] = useState("player");
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const registerMutation = useMutation({
    mutationFn: async (data: z.infer<typeof insertUserSchema>) => {
      const response = await apiRequest("POST", "/api/users", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Account created successfully!",
        description: "You can now sign in with your credentials.",
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<UserFormData>({
    resolver: zodResolver(extendedUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: activeTab,
    },
  });

  function onSubmit(data: UserFormData) {
    // Remove confirm password before sending to API
    const { confirmPassword, ...userData } = data;
    
    // Set role based on active tab
    userData.role = activeTab === "player" ? "player" : "kingdom_admin";
    
    registerMutation.mutate(userData);
  }

  return (
    <>
      <Helmet>
        <title>Sign Up | BannerMatch</title>
        <meta name="description" content="Create an account on BannerMatch to find kingdoms for migration or recruit top players for your kingdom." />
      </Helmet>
      
      <div className="gradient-bg text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-center">
            Join <span className="text-primary">BannerMatch</span>
          </h1>
          <p className="text-center max-w-2xl mx-auto">
            Create an account to start finding your perfect match in Rise of Kingdoms.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                Sign up to access all features of BannerMatch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue="player" 
                value={activeTab} 
                onValueChange={(value) => {
                  setActiveTab(value);
                  form.setValue("role", value);
                }}
                className="mb-6"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="player" className="w-1/2">Player</TabsTrigger>
                  <TabsTrigger value="kingdom_admin" className="w-1/2">Kingdom Admin</TabsTrigger>
                </TabsList>
                <TabsContent value="player">
                  <p className="text-sm text-gray-600 mb-4">
                    Create a player account to find kingdoms looking for new members.
                  </p>
                </TabsContent>
                <TabsContent value="kingdom_admin">
                  <p className="text-sm text-gray-600 mb-4">
                    Create a kingdom admin account to recruit players for your kingdom.
                  </p>
                </TabsContent>
              </Tabs>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter username" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="youremail@example.com" 
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
                          <Input 
                            type="password" 
                            placeholder="Create a password" 
                            {...field} 
                          />
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
                          <Input 
                            type="password" 
                            placeholder="Confirm your password" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-red-700"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <a href="#" className="text-primary hover:underline">
                  Sign In
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, Search, RefreshCw, UserCog, Shield, CheckCircle, XCircle, Calendar, MoreHorizontal, Loader2, Ban, Filter } from "lucide-react";
import { authClient } from "@/auth-client";
import ImpersonateUser from "@/components/admin/impersonate-user";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the User type based on the received data
interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: string;
  banned: boolean | null;
  banReason: string | null;
  banExpires: string | null;
}

// Define pagination and filter types
interface PaginationState {
  page: number;
  limit: number;
}

interface SortState {
  field: string;
  direction: 'asc' | 'desc';
}

interface FilterState {
  field: string | null;
  operator: string | null;
  value: string | null;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState<string>("email");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Pagination, sorting, and filtering state
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10
  });

  const [sorting, setSorting] = useState<SortState>({
    field: "createdAt",
    direction: "desc"
  });

  const [filtering, setFiltering] = useState<FilterState>({
    field: null,
    operator: null,
    value: null
  });

  const { toast } = useToast();
  const router = useRouter();

  // Fetch users data
  const fetchUsers = async () => {
    try {
      setIsLoading(true);

      // Build the query parameters
      const queryParams = {
        limit: pagination.limit,
        offset: (pagination.page - 1) * pagination.limit,
        sortBy: sorting.field,
        sortDirection: sorting.direction
      } as any;

      // Add search parameters if search term exists
      if (searchTerm) {
        queryParams.searchField = searchField;
        queryParams.searchOperator = "contains";
        queryParams.searchValue = searchTerm;
      }

      // Add filter parameters if filter exists
      if (filtering.field && filtering.operator && filtering.value) {
        queryParams.filterField = filtering.field;
        queryParams.filterOperator = filtering.operator;
        queryParams.filterValue = filtering.value;
      }

      const response = await authClient.admin.listUsers({
        query: queryParams
      });

      if (response?.data) {
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
        setTotalUsers(response.data.total || response.data.users.length);
        setTotalPages(Math.ceil((response.data.total || response.data.users.length) / pagination.limit));
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error loading users",
        description: err instanceof Error ? err.message : "Failed to fetch users",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pagination, sorting or filter change
  useEffect(() => {
    fetchUsers();
  }, [pagination.page, pagination.limit, sorting, filtering]);

  // Handle search with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.length === 0 || searchTerm.length > 2) {
        // Reset to first page when searching
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchUsers();
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm, searchField]);

  // Handle ban user
  const handleBanUser = async (userId: string, banReason?: string) => {
    try {
      setIsLoading(true);

      await authClient.admin.banUser({
        userId: userId,
        banReason: banReason || "Banned by administrator",
        banExpiresIn: 60 * 60 * 24 * 30, // 30 days
      });

      toast({
        title: "User Banned",
        description: "User has been banned successfully for 30 days.",
      });

      // Refresh the user list
      fetchUsers();

    } catch (error) {
      console.error("Failed to ban user:", error);
      toast({
        variant: "destructive",
        title: "Ban Failed",
        description: "Could not ban this user. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle unban user
  const handleUnbanUser = async (userId: string) => {
    try {
      setIsLoading(true);

      await authClient.admin.unbanUser({
        userId: userId
      });

      toast({
        title: "User Unbanned",
        description: "User has been unbanned successfully.",
      });

      // Refresh the user list
      fetchUsers();

    } catch (error) {
      console.error("Failed to unban user:", error);
      toast({
        variant: "destructive",
        title: "Unban Failed",
        description: "Could not unban this user. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle change user role
  const handleSetRole = async (userId: string, role: string) => {
    try {
      setIsLoading(true);

      await authClient.admin.setRole({
        userId: userId,
        role: role
      });

      toast({
        title: "Role Updated",
        description: `User's role has been changed to ${role.toUpperCase()}.`,
      });

      // Refresh the user list
      fetchUsers();

    } catch (error) {
      console.error("Failed to update role:", error);
      toast({
        variant: "destructive",
        title: "Role Update Failed",
        description: "Could not update this user's role. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Loading skeleton UI
  const renderSkeletonRows = () => {
    return Array(pagination.limit).fill(0).map((_, i) => (
      <TableRow key={i}>
        {Array(6).fill(0).map((_, j) => (
          <TableCell key={j}>
            <Skeleton className="h-8 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  // Role badge renderer
  const RoleBadge = ({ role }: { role: string }) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <Badge className="bg-red-500 hover:bg-red-600">Admin</Badge>;
      case "moderator":
        return <Badge className="bg-blue-500 hover:bg-blue-600">Moderator</Badge>;
      default:
        return <Badge variant="outline">User</Badge>;
    }
  };

  // Generate initials for avatar fallback
  const getInitials = (name: string | null): string => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Handle sort request
  const handleSort = (field: string) => {
    setSorting(current => ({
      field,
      direction: current.field === field && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Get sort indicator
  const getSortIndicator = (field: string) => {
    if (sorting.field !== field) return null;

    return sorting.direction === 'asc'
      ? <ChevronUp className="ml-1 h-4 w-4" />
      : <ChevronDown className="ml-1 h-4 w-4" />;
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  // Apply role filter
  const handleRoleFilter = (role: string | null) => {
    if (role === null) {
      setFiltering({
        field: null,
        operator: null,
        value: null
      });
    } else {
      setFiltering({
        field: "role",
        operator: "eq",
        value: role
      });
    }
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to page 1 when filtering
  };

  return (
    <div className="container mx-auto py-6 space-y-6 pt-24 px-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your BloomKnot platform</p>
        </div>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold">User Management</CardTitle>
              <CardDescription>
                {totalUsers} total registered users
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center space-x-2">
                <Select
                  value={searchField}
                  onValueChange={setSearchField}
                >
                  <SelectTrigger className="w-[100px] h-9">
                    <SelectValue placeholder="Field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="role">Role</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-8 w-full md:w-[250px] h-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {filtering.field && <Badge variant="secondary" className="ml-2 px-1">1</Badge>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter Users</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuRadioGroup value={filtering.value || ""} onValueChange={handleRoleFilter}>
                    <DropdownMenuRadioItem value="">All Roles</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="moderator">Moderator</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="user">User</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                size="icon"
                variant="outline"
                onClick={fetchUsers}
                disabled={isLoading}
                className="shrink-0 h-9 w-9"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                <span className="sr-only">Refresh</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">
                      <button
                        className="flex items-center font-medium"
                        onClick={() => handleSort('name')}
                      >
                        User {getSortIndicator('name')}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        className="flex items-center font-medium"
                        onClick={() => handleSort('email')}
                      >
                        Email {getSortIndicator('email')}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        className="flex items-center font-medium"
                        onClick={() => handleSort('role')}
                      >
                        Role {getSortIndicator('role')}
                      </button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <button
                        className="flex items-center font-medium"
                        onClick={() => handleSort('createdAt')}
                      >
                        Joined {getSortIndicator('createdAt')}
                      </button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    renderSkeletonRows()
                  ) : users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No users found {searchTerm && `for "${searchTerm}"`}
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.image || undefined} alt={user.name || ''} />
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name || 'Unnamed'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{user.email}</TableCell>
                        <TableCell>
                          <RoleBadge role={user.role} />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center gap-1.5">
                              {user.banned ? (
                                <Badge variant="destructive" className="flex items-center gap-1">
                                  <Ban className="h-3 w-3" /> Banned
                                </Badge>
                              ) : user.emailVerified ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3" /> Verified
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
                                  <XCircle className="h-3 w-3" /> Unverified
                                </Badge>
                              )}
                            </div>
                            {user.banExpires && (
                              <span className="text-xs text-muted-foreground">
                                Until: {formatDate(user.banExpires)}
                              </span>
                            )}
                            {user.banReason && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="text-xs text-muted-foreground underline decoration-dotted cursor-help">
                                      View reason
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">{user.banReason}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {formatDate(user.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => router.push(`/admin/users/${user.id}`)}
                                className="cursor-pointer"
                              >
                                <UserCog className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>

                              {/* Ban/Unban Action */}
                              {user.banned ? (
                                <DropdownMenuItem
                                  onClick={() => handleUnbanUser(user.id)}
                                  className="cursor-pointer"
                                >
                                  <Shield className="h-4 w-4 mr-2" />
                                  Unban User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuSub>
                                  <DropdownMenuSubTrigger>
                                    <Ban className="h-4 w-4 mr-2" />
                                    <span>Ban User</span>
                                  </DropdownMenuSubTrigger>
                                  <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => handleBanUser(user.id, "Violating community guidelines")}>
                                      Violating guidelines
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleBanUser(user.id, "Spam activity")}>
                                      Spam activity
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleBanUser(user.id, "Abusive behavior")}>
                                      Abusive behavior
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleBanUser(user.id)}>
                                      Other reason
                                    </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                                </DropdownMenuSub>
                              )}

                              {/* Role Management */}
                              <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                  <UserCog className="h-4 w-4 mr-2" />
                                  <span>Change Role</span>
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                  <DropdownMenuItem
                                    onClick={() => handleSetRole(user.id, "user")}
                                    disabled={user.role.toLowerCase() === "user"}
                                  >
                                    User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleSetRole(user.id, "moderator")}
                                    disabled={user.role.toLowerCase() === "moderator"}
                                  >
                                    Moderator
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleSetRole(user.id, "admin")}
                                    disabled={user.role.toLowerCase() === "admin"}
                                  >
                                    Admin
                                  </DropdownMenuItem>
                                </DropdownMenuSubContent>
                              </DropdownMenuSub>

                              <DropdownMenuSeparator />

                              <DropdownMenuItem asChild>
                                <div className="w-full">
                                  <ImpersonateUser userId={user.id} dropdown={true} />
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-center justify-between py-4 space-y-3 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            Showing {users.length} of {totalUsers} users
            {filtering.value && <span> • Filtered by: {filtering.value}</span>}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 w-full sm:w-auto">
            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1 || isLoading}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1 text-sm">
                <span>Page</span>
                <span className="font-medium">{pagination.page}</span>
                <span>of</span>
                <span className="font-medium">{totalPages || 1}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= totalPages || isLoading}
              >
                Next
              </Button>
            </div>

            {/* Rows per page selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Rows per page:</span>
              <Select
                value={pagination.limit.toString()}
                onValueChange={(value) => {
                  setPagination({
                    page: 1, // Reset to first page when changing limit
                    limit: Number(value)
                  });
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pagination.limit.toString()} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {users.filter(u => u.emailVerified).length} verified users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Administrators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role.toLowerCase() === 'admin').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              With full system access
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Banned Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.banned).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently restricted from access
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => {
                const date = new Date(u.createdAt);
                const now = new Date();
                return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
              }).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Users registered in {new Date().toLocaleString('default', { month: 'long' })}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

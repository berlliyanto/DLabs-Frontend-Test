/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import {
  Funnel,
  Pencil,
  SortAscending,
  SortDescending,
  Trash,
} from "@phosphor-icons/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { UserInterface } from "@/interfaces/userInterface";
import { Button } from "../ui/button";
import Dialog from "../fragments/Dialog";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  selectPaginatedUsers,
  selectTotalPages,
  setCurrentPage,
  setFilterStatus,
  setSearchNama,
} from "@/redux/slice/userSlice";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import Pagination from "../fragments/Pagination";
import UserAction from "@/actions/userAction";
import Card from "../elements/Card";
import Skeleton from "../elements/Skeleton";
import { UserApiInterface } from "@/interfaces/userApiInterface";

const headers: string[] = ["Name", "Email", "Age", "Status", "Actions"];

const MainLayout = () => {
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortAscending, setSortAscending] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserInterface | null>(null);
  const [UsersAPIM, setUsersAPIM] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const users = useSelector(selectPaginatedUsers);
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector((state: any) => state.user.currentPage);
  const searchNama = useSelector((state: any) => state.user.searchNama);

  const openDialogAdd = () => {
    setIsDialogOpen(true);
    setEditDialogOpen(false);
  };

  const openDialogEdit = (user: UserInterface) => {
    setEditUser(user);
    setIsDialogOpen(true);
    setEditDialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handleFilterStatusChange = (status) => {
    dispatch(setFilterStatus(status));
  };

  const handleSearchNamaChange = (e) => {
    dispatch(setSearchNama(e.target.value));
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    isEdit: boolean
  ): void => {
    e.preventDefault();

    const name = e.currentTarget.name.value;
    const email = e.currentTarget.email.value;
    const umur = e.currentTarget.umur.value;

    const formData = new FormData(e.currentTarget);

    new UserAction().addUser(name, email, umur, formData, isEdit, dispatch);

    closeDialog();
  };

  const handleDelete = (user: UserInterface) => {
    new UserAction().deleteUser(user, dispatch);
  };

  const handleSort = (column: string) => {
    if (column === "Actions") return;

    if (sortColumn === column) {
      setSortAscending(!sortAscending);
    } else {
      setSortColumn(column);
      setSortAscending(true);
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortColumn) return 0;

    const valA = a[sortColumn.toLowerCase()];
    const valB = b[sortColumn.toLowerCase()];

    if (sortAscending) {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    const response = await new UserAction().fetchUsers();
    setUsersAPIM(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main className="px-4 py-4 md:px-20 md:py-24">
      <section id="LocalDataUsers">
        <div className="flex justify-between text-xl text-slate-700 font-bold m-auto w-full text-center md:text-left">
          <p>Data Of Users</p>
          <Button className="bg-green-500" onClick={openDialogAdd}>
            Add User
          </Button>
        </div>
        <Input
          placeholder="Search Name"
          className="w-full my-4"
          value={searchNama}
          onChange={handleSearchNamaChange}
        />
        <Table>
          <TableCaption>A list of users.</TableCaption>
          <TableHeader>
            <TableRow>
              {headers.map((item, index) => (
                <TableHead key={index}>
                  <div className="flex items-center gap-1">
                    {item}
                    {item === "Status" && (
                      <Popover>
                        <PopoverTrigger>
                          <Funnel />
                        </PopoverTrigger>
                        <PopoverContent className="">
                          <Select
                            name="filterstatus"
                            onValueChange={handleFilterStatusChange}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Aktif">Aktif</SelectItem>
                              <SelectItem value="Tidak Aktif">
                                Tidak Aktif
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </PopoverContent>
                      </Popover>
                    )}
                    {item !== "Actions" && item !== "Status" && (
                      <div
                        onClick={() => handleSort(item)}
                        className="cursor-pointer"
                      >
                        {sortColumn === item && sortAscending ? (
                          <SortAscending />
                        ) : sortColumn === item && !sortAscending ? (
                          <SortDescending />
                        ) : (
                          <SortAscending className="opacity-30" />
                        )}
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{user.nama}</TableCell>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell className="font-medium">{user.umur}</TableCell>
                <TableCell className="font-medium">
                  {user.status_keanggotaan ? "Aktif" : "Tidak Aktif"}
                </TableCell>
                <TableCell className="gap-2 flex">
                  <Button
                    className="bg-yellow-500"
                    onClick={() => openDialogEdit(user)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="bg-red-700"
                    onClick={() => handleDelete(user)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />

        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          title={editDialogOpen ? "Edit User" : "Add User"}
        >
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => handleSubmit(e, editDialogOpen)}
          >
            <Input
              defaultValue={editDialogOpen ? editUser?.nama : ""}
              placeholder="Name"
              name="name"
              id="name"
              className="col-span-3"
              required
            />
            <Input
              type="email"
              defaultValue={editDialogOpen ? editUser?.email : ""}
              placeholder="Email"
              name="email"
              id="email"
              className="col-span-3"
              required
            />
            <Input
              defaultValue={editDialogOpen ? editUser?.umur : ""}
              type="number"
              placeholder="Umur"
              name="umur"
              id="umur"
              className="col-span-3"
              required
            />
            <Select
              name="status"
              defaultValue={
                editDialogOpen
                  ? editUser?.status_keanggotaan
                    ? "Aktif"
                    : "Tidak Aktif"
                  : "Aktif"
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Submit</Button>
          </form>
        </Dialog>
      </section>
      <div className="flex justify-between text-xl text-slate-700 font-bold m-auto w-full text-center md:text-left">
        <p>Data From API</p>
      </div>
      <section id="FromAPI" className="flex flex-wrap mt-6 gap-6">
        {isLoading ? (
          <Fragment>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </Fragment>
        ) : (
          
          UsersAPIM.map((user: UserApiInterface, index) => {
            return (
              <Card
                key={index}
                image={user.avatar_url}
                name={user.login}
                type={user.type}
              />
            );
          })
        )}
      </section>
    </main>
  );
};

export default MainLayout;

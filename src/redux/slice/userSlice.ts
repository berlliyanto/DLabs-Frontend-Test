import { createSlice } from "@reduxjs/toolkit";
import { UserInterface } from "../../interfaces/userInterface";

const initialUsers: UserInterface[] = [
  {
    nama: "Berli",
    email: "berli@gmail.com",
    umur: 20,
    status_keanggotaan: true,
  },
  {
    nama: "Rizky",
    email: "rizky@gmail.com",
    umur: 25,
    status_keanggotaan: false,
  },
];

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users")!)
      : initialUsers,
    currentPage: 1,
    itemsPerPage: 5,
    filterStatus: "All", // Nilai awal filter (All, Aktif, Tidak Aktif)
    searchNama: "", // Menyimpan kata kunci pencarian berdasarkan nama
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.email === action.payload.email
      );
      if (index !== -1) {
        state.users[index] = action.payload; // Memperbarui data pengguna
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    deleteUser: (state, action) => {
      const updatedUsers = state.users.filter(
        (user) => user.email !== action.payload.email
      );
      state.users = updatedUsers;
      localStorage.setItem("users", JSON.stringify(state.users)); // Menyimpan perubahan ke localStorage
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
      state.currentPage = 1; // Reset halaman ke pertama saat filter berubah
    },
    setSearchNama: (state, action) => {
      state.searchNama = action.payload; // Memperbarui kata kunci pencarian nama
      state.currentPage = 1; // Reset halaman ke pertama saat pencarian berubah
    },
  },
});

export const {
  setUsers,
  addUser,
  setCurrentPage,
  setItemsPerPage,
  setFilterStatus,
  setSearchNama,
  updateUser,
  deleteUser,
} = userSlice.actions;

// Selector untuk memfilter data users berdasarkan status dan nama
export const selectPaginatedUsers = (state) => {
  const { users, currentPage, itemsPerPage, filterStatus, searchNama } =
    state.user;

  // Filter data berdasarkan status keanggotaan
  const filteredUsers = users.filter((user) => {
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Aktif"
        ? user.status_keanggotaan
        : !user.status_keanggotaan);
    const matchesName = user.nama
      .toLowerCase()
      .includes(searchNama.toLowerCase()); // Pencarian berdasarkan nama

    return matchesStatus && matchesName;
  });

  // Pagination
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredUsers.slice(start, end);
};

// Selector untuk mendapatkan jumlah total halaman berdasarkan data yang difilter
export const selectTotalPages = (state) => {
  const { users, itemsPerPage, filterStatus, searchNama } = state.user;

  const filteredUsers = users.filter((user) => {
    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Aktif"
        ? user.status_keanggotaan
        : !user.status_keanggotaan);
    const matchesName = user.nama
      .toLowerCase()
      .includes(searchNama.toLowerCase());

    return matchesStatus && matchesName;
  });

  return Math.ceil(filteredUsers.length / itemsPerPage);
};

export default userSlice.reducer;

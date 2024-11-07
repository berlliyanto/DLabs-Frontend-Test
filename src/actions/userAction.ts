import { UserInterface } from "@/interfaces/userInterface";
import { addUser, deleteUser, updateUser } from "@/redux/slice/userSlice";
import { getUsers } from "@/services/getUsers";
import { Dispatch, UnknownAction } from "redux";

class UserAction {
  addUser(
    name: string,
    email: string,
    umur: string,
    formData: FormData,
    isEdit: boolean,
    dispatch: Dispatch<UnknownAction>
  ) {
    if (!name || !email || !umur || !formData.get("status")) {
      alert("Data Tidak Boleh Kosong");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      alert("Email Tidak Valid");
      return;
    }

    if (!/^\d+$/.test(umur)) {
      alert("Umur Harus Angka");
      return;
    }

    if (parseInt(umur) < 0) {
      alert("Umur Tidak Valid");
      return;
    }

    const newUser: UserInterface = {
      nama: name,
      email: email,
      umur: parseInt(umur),
      status_keanggotaan: formData.get("status") === "Aktif",
    };

    if (isEdit) {
      dispatch(updateUser(newUser));
    } else {
      dispatch(addUser(newUser));
    }
  }

  deleteUser(user: UserInterface, dispatch: Dispatch<UnknownAction>) {
    if (window.confirm(`Are you sure you want to delete ${user.nama}?`)) {
      dispatch(deleteUser(user));
    }
  }

  async fetchUsers() {
    const response = await getUsers();
    if (response.status == 200) {
      return response.data;
    } else {
      return response;
    }
  }
}

export default UserAction;

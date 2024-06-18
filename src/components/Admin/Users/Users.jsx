import axios from "axios";
import { FaUserTie } from "react-icons/fa6";
import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, message } from "antd";
import { MdDelete } from "react-icons/md";
import { FcEditImage } from "react-icons/fc";

import { Modal, Popconfirm } from "antd";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../Footer/Footer";
const Users = () => {
  const [open, setOpen] = useState(false);
  const success = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const failed = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // ============== searchText ============
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 50,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 50,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Full name",
      dataIndex: "fullname",
      key: "fullname",

      width: "20%",
      ...getColumnSearchProps("fullname"),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "20%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      ...getColumnSearchProps("role"),
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "30%",
      ...getColumnSearchProps("createdAt"),
      render: (text, record) => {
        const formattedDate = new Date(text).toLocaleString();

        return formattedDate;
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "20%",
    },
  ];

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  // ============= fetching users =================
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get("http://localhost:9000/api/v1/users/all");
    const data = response.data.data;
    setData(data);
  };
  useEffect(() => {
    getData();
  }, []);
  // ================== delete user =====================
  async function handleDelete(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:9000/api/v1/users/delete/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      success(response.data.message);
      getData();
    } catch (err) {
      console.error(err);
      failed(response.error.message);
    }
  }
  // ============ Edit Modal =========
  const [dataEdit, setDataEdit] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function getSingleUser(id) {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:9000/api/v1/users/single/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDataEdit(res.data.data))
      .catch((err) => console.log(err));
  }

  function handleUpdate(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", dataEdit._id);
    formData.append("fullname", dataEdit.fullname);
    formData.append("username", dataEdit.username);
    formData.append("role", dataEdit.role);
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:9000/api/v1/users/update/${dataEdit._id}`,
        formData
      )
      .then((res) => {
        success("Successifully updated");
        setTimeout(() => {
          setIsModalOpen(false);
          getData();
        }, 3000);
      });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="">
        <Table
          className="overflow-x-scroll w-full"
          columns={columns}
          size="small"
          dataSource={data.map((item, index) => {
            return {
              key: item.id,
              profile: (
                <div className="w-10 h-10">
                  {!item.profile ? (
                    <FaUserTie size={24} />
                  ) : (
                    <img
                      src={item.profile}
                      alt=""
                      className="w-full h-full rounded-full"
                    />
                  )}
                </div>
              ),
              fullname: item.fullname,
              username: item.username,
              role: item.role,
              createdAt: item.createdAt,

              action: (
                <Space>
                  <div
                    onClick={(e) => {
                      getSingleUser(item._id);
                      showModal();
                    }}
                  >
                    <FcEditImage size={24} className="edit-buttom" />
                  </div>
                  <Popconfirm
                    title="Delete User"
                    description="Are you sure to delete this User?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={(e) => handleDelete(item._id)}
                  >
                    <MdDelete size={24} className="delete-buttom" />
                  </Popconfirm>
                </Space>
              ),
            };
          })}
          pagination={{
            defaultPageSize: 5,
          }}
        />
      </div>
      {/* ================= Edit Modal ================== */}
      <Modal
        title="Edit User"
        style={{
          top: 60,
        }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="add__dimension">
          <form action="#" onSubmit={handleUpdate}>
            <div className="add__dimension-row">
              <div>
                <label>Full Name</label>

                <input
                  type="text"
                  id="fullname"
                  value={dataEdit.fullname}
                  name="fullname"
                  placeholder="Full name"
                  className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4 mt-4"
                  onChange={(e) => {
                    setDataEdit({
                      ...dataEdit,
                      fullname: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div>
              <label>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={dataEdit.username}
                placeholder="Username"
                className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                onChange={(e) => {
                  setDataEdit({ ...dataEdit, username: e.target.value });
                }}
              />
            </div>
            <div>
              <label>Role</label>
              <select
                name="role"
                value={dataEdit.role}
                className="w-full rounded-md border border-gray-900 dark:border-gray-500  px-2 py-1 mb-4"
                onChange={(e) => {
                  setDataEdit({ ...dataEdit, role: e.target.value });
                }}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <div className=" font-[Poppins] flex justify-between items-center cursor-pointer bg-[#006991] p-2 lg:w-24 md:w-32 w-20 rounded-md mt-10 mb-4">
              <button
                className=" font-[Poppins] text-white  lg:text-xl md:text-3xl"
                name="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Users;

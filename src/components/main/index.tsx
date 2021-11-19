import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import axios from "axios";
import "./style.css";
import { getNameStatus } from "./function";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& input": {
      color: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

const statusId = [
  { id: 1, name: "تلگرام" },
  { id: 2, name: "انستگرام" },
  { id: 3, name: "واتساپ" },
  { id: 4, name: "لینکدین" },
  { id: 5, name: "تویتر" },
];

export default function index() {
  const classes = useStyles();
  const [menu, setMenu] = useState(false);
  const [link, setLink] = useState<string>("");
  const [status, setStatus] = useState<string>();
  const [username, setUserName] = useState<string>("");
  const [list, setList] = useState<any>();
  const [dataEdit, setDataEdit] = useState<any>();
  const [show, setShow] = useState<boolean>(false);

  const handleSubmit = async () => {
    const params = {
      social_id: username,
      social_link: link,
      status_id: status,
    };

    try {
      if (username && link && status) {
        const url = `http://localhost:3030/socials`;
        const data = await axios.post(url, params);
        if (data.status == 201) {
          getList();
          refresh();
          console.log("success");
          setMenu(false);
        }
      }
    } catch (err) {
      console.log(err, "error");
    }
  };
  const handleEdited = async () => {
    const body = {
      social_id: username,
      social_link: link,
      status_id: status,
    };
    try {
      if (username && link && status) {
        const url = `http://localhost:3030/socials/${dataEdit?.id}`;
        const data = await axios.put(url, body);
        if (data.status == 200) {
          getList();
          refresh();
          console.log("success");
          setShow(false);
          setMenu(false);
        }
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  const handleCancell = () => {
    setShow(false);
    setMenu(false);
    refresh();
  };

  const refresh = () => {
    setStatus("");
    setUserName("");
    setLink("");
  };

  const getList = async () => {
    try {
      const url = "http://localhost:3030/socials";
      const data = await axios.get(url);
      setList(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const handleDelete = async (id: any) => {
    try {
      const url = `http://localhost:3030/socials/${id}`;
      const data = await axios.delete(url);
      if (data.status == 200) getList();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (id: any) => {
    setShow(true);
    setMenu(true);
    try {
      const url = `http://localhost:3030/socials/${id.id}`;
      const data = await axios.get(url);
      setDataEdit(data.data);
      if (data.status == 200) getList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // setStatus(dataEdit?.status);
    setUserName(dataEdit?.social_id);
    setLink(dataEdit?.social_link);
  }, [dataEdit]);

  return (
    <div className="flex justify-center mt-10 ">
      <div className=" bg-gray-600-500 p-5 items-center w-2/3 bg-gray-800 rounded-2xl">
        <div className="flex justify-center text-white ">
          <div className="bg-gray-800 w-4/5 p-3 ">
            <div className="flex justify-end ">مسیر های ارتباطی</div>
            <div
              className="flex justify-end mt-3 text-yellow-500 cursor-pointer"
              onClick={() => setMenu(!menu)}
            >
              {show ? "ویرایش مسیر ارتباطی" : "افزودن مسیر ارتباطی"}
              <ControlPointIcon className="ml-3" />
            </div>
          </div>
        </div>
        <Collapse in={menu}>
          <div className="flex justify-center">
            <div className="w-auto bg-gray-700 rounded-xl p-2">
              <div dir="rtl" className=" ">
                <div className="text-white mr-10 mt-3">افزودن مسیر ارتباطی</div>
                <div
                  className={` h-48 flex justify-center items-center rounded-2xl`}
                >
                  <div className=" items-center">
                    <div className="flex justify-between">
                      <FormControl sx={{ m: 1, minWidth: 130 }}>
                        <InputLabel className="color-select">نوع</InputLabel>
                        <Select
                          required
                          className="-mt-2 w-52 color-select"
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <MenuItem value="">
                            <em>نوع</em>
                          </MenuItem>
                          {statusId.map((i) => (
                            <MenuItem value={i.id}>{i.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <div className="">
                        <TextField
                          onChange={(e) => setLink(e.target.value)}
                          value={link}
                          className={classes.root}
                          label="لینک"
                          variant="outlined"
                        />
                      </div>
                      <div className="mr-2">
                        <TextField
                          onChange={(e) => setUserName(e.target.value)}
                          value={username}
                          className={classes.root}
                          label="ایدی (ID)"
                          variant="outlined"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={handleCancell}
                        className="bg-transparent text-white hover:bg-yellow-500 text-white-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        انصراف
                      </button>
                      <div>
                        {show ? (
                          <button
                            className="mr-3 bg-transparent text-white hover:bg-yellow-500 text-white-700 font-semibold hover:text-white py-1 px-4 border border-yellow-500 hover:border-transparent rounded"
                            onClick={handleEdited}
                          >
                            ویرایش مسیر ارتباطی
                          </button>
                        ) : (
                          <button
                            className="mr-3 bg-transparent text-white hover:bg-yellow-500 text-white-700 font-semibold hover:text-white py-1 px-4 border border-green-500 hover:border-transparent rounded"
                            onClick={handleSubmit}
                          >
                            ثبت مسیر ارتباطی
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
        {list?.map((item: any) => (
          <div
            key={item.id}
            className="flex justify-between text-white mt-3 px-5"
            dir="rtl"
          >
            <div>
              <div className="flex justify-between w-auto">
                <div className="ml-5"> {getNameStatus(item?.status_id)}</div>
                <div>
                  <span className="text-gray-300 ml-5"> آی دی (ID) :</span>
                  {item.social_id}@
                </div>
                <div className="text-yellow-500">
                  <span className="text-gray-300 mr-5 cursor-pointer">
                    لینک :
                  </span>
                  <a href={item.social_link}>https://{item.social_link}</a>
                </div>
              </div>
            </div>

            <div className="flex justify-between  w-40">
              <div>
                <button
                  className="text-yellow-400"
                  onClick={() => handleEdit(item)}
                >
                  <ModeEditOutlineIcon /> ویرایش
                </button>
              </div>
              <div>
                <button
                  className="text-red-400"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteForeverIcon /> حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

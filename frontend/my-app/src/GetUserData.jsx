import { useState } from "react";
import { useEffect } from "react";
import styles from './adminPanel.module.css';
import { useNavigate } from "react-router-dom";

function GetUserData() {


    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getData();
    }, [])


    const getData = async () => {
        const url = "http://localhost:3200/admin/users";
        const getRes = await fetch(url, {
            method: 'Get',
            credentials: 'include',
        });
        const res = await getRes.json();
        if (!res.success) {
            alert(res.message)
            return;
        } else {
            setData(res.data)
        }
    }

    const adminUpdateData = async (id) => {
        const url = "http://localhost:3200/admin/update/" + id;
        const updateRes = await fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
        })
        const res = await updateRes.json();
        if (!res.success) {
            alert(res.message)
        } else {
            alert(res.message);
            getData();
        }
    }

    const logout = async(e)=>{
        e.preventDefault();
        const url = "http://localhost:3200/user/logout";
        const logoutRes = await fetch(url, {
            method: 'POST',
            credentials: 'include'
        })
        const res = await logoutRes.json();
        if(res.success){
            alert(res.message)
            navigate('/')
        }
    }

    function getProduct(){
        navigate('/admin/product')
    }

    return (
        <>
            <div className={styles.headSet}>
                <h1 className={styles.heading}>User Data</h1>
                <button onClick={logout} className={styles.btn}>logout</button>
                <button className={styles.btn} onClick={getProduct}>Products </button>

            </div>
            <table className={styles.adminPanelTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>isActive</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        data.map((userdata, index) => (
                            <tr key={userdata._id} >
                                <td>{userdata.name}</td>
                                <td>{userdata.email}</td>
                                <td>
                                    <button onClick={() => adminUpdateData(userdata._id)}>{userdata.isActive ? "Active" : "Disabled"}</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </>
    )
}

export default GetUserData;
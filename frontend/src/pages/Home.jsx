
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {

    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProducts = async () => {
        try {
            const url = "https://deploy-mern-app-1-api.vercel.app/products";
            // const url = 'https://localhost:8080/auth/products'
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    
    const [modalData, setModalData] = useState(null);

    const loans = [
        {
            title: 'Wedding Loans',
            subcategories: ['Valima', 'Furniture', 'Valima Food', 'Jahez'],
            maxLoan: 'PKR 5 Lakh',
            loanPeriod: '3 years',
        },
        {
            title: 'Home Construction Loans',
            subcategories: ['Structure', 'Finishing', 'Loan'],
            maxLoan: 'PKR 10 Lakh',
            loanPeriod: '5 years',
        },
        {
            title: 'Business Startup Loans',
            subcategories: ['Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery'],
            maxLoan: 'PKR 10 Lakh',
            loanPeriod: '5 years',
        },
        {
            title: 'Education Loans',
            subcategories: ['University Fees', 'Child Fees Loan'],
            maxLoan: 'Based on requirement',
            loanPeriod: '4 years',
        },
    ];

    const applyLoan = (loan) => {
        setModalData(loan);
    };

    const closeModal = () => {
        setModalData(null);
    };

    

    return (
        <div>
           <div className='flex justify-center items-center gap-5'>
           <h1>Welcome {loggedInUser}</h1>
           <button onClick={handleLogout}>Logout</button>
           </div>
            <div>

                <div className=''>
                <div className="bg-gray-50 text-gray-800 min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Loan Categories</h1>
            <div className=''>
            {loans.map((loan, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">{loan.title}</h2>
                    <ul className="list-disc pl-5 mb-4">
                        {loan.subcategories.map((subcategory, idx) => (
                            <li key={idx}>{subcategory}</li>
                        ))}
                    </ul>
                    <p><strong>Maximum Loan:</strong> {loan.maxLoan}</p>
                    <p><strong>Loan Period:</strong> {loan.loanPeriod}</p>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
                        onClick={() => applyLoan(loan)}
                    >
                        Apply Now
                    </button>
                </div>
            ))}
            </div>

            {modalData && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Apply for {modalData.title}</h2>
                        <p className="mb-4">
                            <strong>Maximum Loan:</strong> {modalData.maxLoan}
                            <br />
                            <strong>Loan Period:</strong> {modalData.loanPeriod}
                        </p>
                        <button 
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
                </div>



                {/* {
                    products && products?.map((item, index) => (
                        <ul key={index}>
                            <span>{item.name} : {item.price}</span>
                        </ul>
                    ))
                } */}

            </div>
            <ToastContainer />
        </div>
    )
}

export default Home

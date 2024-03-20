import { useLocation, useNavigate } from "react-router-dom"
import { ChangeEvent, useEffect, useState } from "react"
import dataService from '../../services/handleRequests'
import { BiLeftArrowAlt } from "react-icons/bi"
import { BiShowAlt } from "react-icons/bi"
import { BiCheck } from "react-icons/bi"
import { BiHide } from "react-icons/bi"

const newPassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [reEnterPassword, setReEnterPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [unmatching, setUnmatching] = useState('')
    const [revealFirstPass, setRevealFirstPass] = useState(false)
    const [revealSecond, setRevealSecond] = useState(false)
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

    const navigate = useNavigate()
    const location = useLocation()
    const token = new URLSearchParams(location.search).get('token')

    useEffect(() => {
        const validateToken = async () => {
            try {
                const isValid = await dataService.validateToken(token)
                if (isValid.valid) {
                    console.log('Valid token! ')
                } else {
                    navigate('/')
                }
            } catch (error) {
                navigate('/')
            }
        }

        validateToken()
    }, [])

    const handleNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value)
    }

    const handleReEnterPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const enteredValue = event.target.value;
        setReEnterPassword(enteredValue);

        if (reEnterPassword.length > newPassword.length || (reEnterPassword.length === newPassword.length && newPassword !== reEnterPassword)) {
            setUnmatching('The passwords are different.')
        } else {
            setUnmatching('')
        }
    }

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (newPassword !== '') {
            try {
                const restorePassword = await dataService.restorePasword(newPassword, token)
                if (restorePassword.message) {
                    setSuccessMessage(restorePassword.message)
                    setTimeout(() => {
                        setSuccessMessage('')
                    }, 5000)
                } else if (restorePassword.error) {
                    setErrorMessage(restorePassword.error)
                    setTimeout(() => {
                        setErrorMessage('')
                    }, 5000)
                }
            } catch(error) {
                console.log(error)
            }
        } else if (!regex.test(newPassword)) {
            setErrorMessage('Enter a valid password.')
        } else {
            setErrorMessage('You must enter a password!')
        } 
    }

    const handleFirstReveal = () => {
        setRevealFirstPass(prev => {
            return !prev
        })
    }

    const handleSecondReveal = () => {
        setRevealSecond(prev => {
            return !prev
        })
    }

    const goBack = () => {
        navigate('/')
    }

    return (
        <div className="flex flex-col justify-center">
            <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 underline underline-offset-">
                        Password Reset
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="mt-4">
                        <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">
                            Enter a new password:
                        </label>
                        <div className="mt-2 flex items-center">
                            <input
                                type={!revealFirstPass ? "password" : "text"}
                                name="newPassword"
                                id="newPassword"
                                required={true}
                                onChange={handleNewPassword}
                                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 px-3"
                            />
                            <button
                                className="ml-2"
                                onClick={handleFirstReveal}
                                type="button"
                            >
                                {!revealFirstPass ? <BiShowAlt size={24} /> : <BiHide size={24} />}
                            </button>
                        </div>
                        
                        <label htmlFor="reEnterPassword" className="block mt-10 text-sm font-medium leading-6 text-gray-900">
                            Re-enter the password:
                        </label>

                        <div className="mt-2 flex items-center">
                            <input
                                type={!revealSecond ? "password" : "text"}
                                name="reEnterPassword"
                                id="reEnterPassword"
                                required={true}
                                onChange={handleReEnterPassword}
                                className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6 px-3"
                            />
                            <button
                                className="ml-2"
                                onClick={handleSecondReveal}
                                type="button"
                            >
                                {!revealSecond ? <BiShowAlt size={24} /> : <BiHide size={24} />}
                            </button>
                        </div>
                        {
                            unmatching !== ''
                            ? (
                                <p className="mt-2 text-red-600">{unmatching}</p>
                            ) : ''
                        }
                        <button
                            type="submit"
                            className="flex w-full justify-center mt-10 rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                            onClick={handleSubmit}
                            >
                            Reset password
                        </button>
                    </form>
                    <div>
                    <button
                        className="flex flex-row mt-5 cursor-pointer hover:text-amber-700 hover:underline hover:underline-offset-2"
                        onClick={goBack}
                    >
                        <BiLeftArrowAlt size={24} />
                        <span>Go back to the login page</span>
                    </button>
                </div>
                </div>
                <div className="flex items-center justify-center mt-10">
                    <ul className="flex flex-col list-disc text-sm mt-2 font-medium leading-6 text-gray-900">
                        <p className="text-base mb-2">The password must contain:</p>
                        <li>As a minimum, 8 characters.</li>
                        <li>At least 1 uppercase character.</li>
                        <li>At least 1 lowercase character.</li>
                        <li>At least 1 number.</li>
                        <li>Can contain symbols.</li>
                    </ul>
                </div>
                
                {
                    successMessage !== ''
                    ? (
                        <div className="flex flex-col bg-green-100 w-fit py-4 px-4 rounded-lg items-center border-2 border-green-300 m-auto">
                            <div className="flex flex-row gap-2 font-bold">
                                <BiCheck  size={24} />
                                <h1>{successMessage}</h1>
                            </div>
                            <p className="mt-4">You can now close this tab.</p>
                        </div>
                    ) : ''
                }
                {
                    errorMessage !== ''
                    ? (
                        <>
                            <div className="flex flex-col bg-red-100 w-fit py-4 px-4 rounded-lg items-center border-2 border-red-300 m-auto">
                                <div className="flex flex-row gap-2 font-bold">
                                    <BiCheck  size={24} />
                                    <h1>{errorMessage}</h1>
                                </div>
                            </div>
                        </>
                    ) : ''
                }
            </div>
        </div>
    )
}

export default newPassword
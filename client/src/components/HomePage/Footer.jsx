import React from 'react'

function Footer() {
    return (
        <footer className="m-2 h-[20vh] w-[99%] text-center text-lg-start bg-gray-900" >
            <div className="container d-flex justify-content-center py-5">
                <button
                    type="button"
                    className="h-14 w-14 btn btn-floating btn-primary mx-2 rounded-full"
                    style={{ backgroundColor: "#54456b" }}
                >
                    <img src="https://img.icons8.com/?size=100&id=32292&format=png&color=FFFFFF" alt="instagram icon" className='size-6' />
                </button>

                <button
                    type="button"
                    className="h-14 w-14 btn btn-floating btn-primary mx-2 rounded-full"
                    style={{ backgroundColor: "#54456b" }}
                >
                    <img src="https://img.icons8.com/?size=100&id=87264&format=png&color=FFFFFF" alt="Facebook icon" className='size-6' />
                </button>

                <button
                    type="button"
                    className="h-14 w-14 btn btn-floating btn-primary mx-2 rounded-full"
                    style={{ backgroundColor: "#54456b" }}
                >
                    <img src="https://img.icons8.com/?size=100&id=NgVx6SS0Wbjb&format=png&color=FFFFFF" alt="Youtube icon" className='size-6' />
                </button>

                <button
                    type="button"
                    className="h-14 w-14 btn btn-floating btn-primary mx-2 rounded-full"
                    style={{ backgroundColor: "#54456b" }}
                >
                    <img src="https://img.icons8.com/?size=100&id=A4DsujzAX4rw&format=png&color=FFFFFF" alt="Twitter icon" className='size-6' />
                </button>
            </div>
            <div
                className="text-center text-white p-3"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
                © 2025 Copyright:
                <a className="text-white" href="https://RIZZ.com/">
                    RIZZ.com
                </a>
            </div>
        </footer>
    )
}

export default Footer
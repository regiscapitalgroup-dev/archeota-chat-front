const AuthFooter = () =>{ 
    return (
        <div className='d-flex flex-center flex-column-auto p-10'>
            <div className='d-flex align-items-center fw-bold fs-6'>
                <a href='/about' className='text-muted text-hover-primary px-2'>
                    About
                </a>
                <a href='/contact' className='text-muted text-hover-primary px-2'>
                    Contact
                </a>
                <a href='/contact-us' className='text-muted text-hover-primary px-2'>
                    Contact Us
                </a>
            </div>
        </div>
    )
}
export default AuthFooter;
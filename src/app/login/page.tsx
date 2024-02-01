
import Link from 'next/link';

const Login = () => {

    // const handleLogin = async data => {
    //     try {
    //         navigate('/Login')
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <div >
                <h1 style={{textAlign: 'center', marginBottom: '4vh', fontSize: '4.5rem'}}>OpusAI Login</h1>
            </div>
            <div>
                <Link href="/api/login">
                    <button style={{ fontSize: '3vh', padding: '15px 30px', borderRadius: '8px', background: '#007bff', color: '#fff'}}>Log in with Google</button>
                </Link>
            </div>
        </div>
    );
};

export default Login;
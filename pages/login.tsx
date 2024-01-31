
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
                <h1 style={{textAlign: 'center', marginBottom: '4vh'}}>OpusAI Login</h1>
            </div>
            <div>
                <Link href="/api/login">
                    <button style={{ fontSize: '3vh'}}>Log in with Google</button>
                </Link>
            </div>
        </div>
    );
};
export default Login;
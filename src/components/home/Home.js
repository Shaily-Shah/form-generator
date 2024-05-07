import GenerateForm from '../generate-form/GenerateForm'
import './Home.scss'

function Home() {
    const showForm = true
    return (
        <>
            <GenerateForm showForm={showForm} />
        </>
    )
}

export default Home;
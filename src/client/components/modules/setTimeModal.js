
const ModalContent = ({ confirm, closeModal }) => {
    return (
        <>
            <h2 className="text-lg font-bold mb-5 mt-5">Lägg till ny stående tid</h2>
            <button className="text-xl font-bold absolute right-3 top-1" onClick={closeModal}>×</button>
            <form className="flex flex-col flex-wrap" onSubmit={confirm}>
                <label>Information
                    <input name="info" className="w-full mb-2 p-1 bg-[#f2f3f4]" type="text" />
                </label>
                <button className="bg-[#0d730d] text-white p-5 mt-4" type="submit">Lägg till</button>
            </form>
        </>
    )
}


export default ModalContent;
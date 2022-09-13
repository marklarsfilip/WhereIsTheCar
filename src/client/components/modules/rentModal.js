
const ModalContent = ({ useCarConfirmation, closeModal }) => {
    return (
        <>
            <h2 className="text-lg font-bold mb-5 mt-5">Ska du använda bilen?</h2>
            <button className="text-xl font-bold absolute right-3 top-1" onClick={closeModal}>×</button>
            <form className="flex flex-col flex-wrap" onSubmit={useCarConfirmation}>
                <label>Vem?
                    <input name="user" className="w-full mb-2 p-1 bg-[#f2f3f4]" type="text"
                    />
                </label>
                <label>Beräknas vara tillbaka?
                    <input name="timeForReturn" className="w-full mb-2 p-1 bg-[#f2f3f4]" type="text" />
                </label>
                <label>Kommentar?
                    <input name="comment" className="w-full mb-2 p-1 bg-[#f2f3f4]" type="text" />
                </label>
                <button className="bg-[#0d730d] text-white p-5 mt-4" type="submit">Använd bilen</button>
            </form>
        </>
    )
}


export default ModalContent;
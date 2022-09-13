import { useEffect, useState } from 'react';

const CarStatus = ({ status }) => {

    const [oldStatus, setOldStatus] = useState('new');

    useEffect(() => {
        const now = new Date().getTime();
        if (status?.dateTime && now - status.dateTime > 86400000) {
            if (now - status.dateTime > 172800000) {
                setOldStatus('very-old');
            } else {
                setOldStatus('old');
            }
        }
    }, [status])


    return (

        <div className="basis-3/4">
            <h1 className="text-white text-xl mb-5">Bilen är just nu {' '}
                <span className={status.available ? 'text-[#8ee53f]' : 'text-[#d41730]'}>{status.available ? 'ledig' : 'upptagen'}</span>
                <span>{!status.available ? ` av ${status.user}` : ''}</span>
            </h1>
            {!status.available && (
                <>
                    <p className="text-white font-bold mb-3">Beräknad återkomst <span className="block font-normal">{status?.estimatedReturn}</span></p>
                    <p className="text-white font-bold mb-3">Kommentar: <span className="block font-normal">{status?.comment?.length > 0 ? (status.comment) : ('-')}</span></p>
                    {oldStatus === 'old' && (<span className="text-white mt-4">OBS! Denna info registrerades för mer än 24h sedan..</span>)}
                    {oldStatus === 'very-old' && (<span className="text-white mt-4">OBS! Denna info registrerades för flera dagar sedan..</span>)}
                </>
            )}
        </div>


    )
}

export default CarStatus;
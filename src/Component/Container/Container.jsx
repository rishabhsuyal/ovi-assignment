import React from 'react'

function Container({data,handleImg}) {
    return (
        <div className='p-4'>
            <div className='grid grid-cols-3 gap-6'>
                {
                    data.map(img => {
                        var url = `https://live.staticflickr.com/${img.server}/${img.id}_${img.secret}_w.jpg`
                        return <img
                        alt='img'
                            onClick={() => handleImg(url)}
                            className='' src={url} />
                    }
                    )
                }
            </div>
        </div>
    )
}

export default Container
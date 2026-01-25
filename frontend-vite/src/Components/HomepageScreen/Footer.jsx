import React from 'react'

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <> 
        <div class="wave-container wave">
            <p>© {year}, Developed & Designed with ❤️ by <a className='footer_kartikeya' target='kartikeya' href='https://github.com/KartikeyaGupta05'>Kartikeya Gupta</a></p>
        </div>
    </>
  )
}

export default Footer
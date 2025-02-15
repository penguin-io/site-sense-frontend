import React from 'react'

const HeadingChip = ({title}) => {
  return (
    <h1 className='p-1 px-4 bg-[var(--accent-foreground)] text-white m-4'>
     {'> ' + title ?? 'title'} 
    </h1>
  )
}

export default HeadingChip

import { ChevronDoubleRightIcon } from '@heroicons/react/24/outline';
import React, { FunctionComponent } from 'react'
import { IProjects } from '../type';

const ProjectTitle:FunctionComponent<{
    project: IProjects; 
    show:null|number;
    setShow:(id:null | number) => void;}> = ({
        project: {id, title},
        show, setShow  
    }) => {
  console.log("show", show)
  return (
    <li className="flex items-center font-bold cursor-pointer hover:text-light-orange" onClick={() => setShow(id)}> 
      <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full border-light-green shrink-0">
        {id}
      </span>
      {title}
      {id === 1  && (
        <ChevronDoubleRightIcon className="w-4 h-4 ml-2 sm:ml-4" />
      )}
      {id === 2  && (
        <ChevronDoubleRightIcon className="w-4 h-4 ml-2 sm:ml-4" />
      )}
    </li> 
  )
}

export default ProjectTitle
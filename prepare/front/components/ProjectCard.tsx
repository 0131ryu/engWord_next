import React, { FunctionComponent, useState } from 'react'
import { IProjects } from '../type';
import Link from "next/link"

const ProjectCard:FunctionComponent<{
  project: IProjects; 
  show:null|number;
  setShow:(id:null | number) => void;}> = ({
    project: {id, title, name, description, image_path, path},
    show, setShow}) => {

  const [buttonTitle, setButtonTitle] = useState(title)
  const [buttonPath, setButtonPath] = useState(path);
  const [activeItem, setActiveItem] = useState<string>("")
  
  const ButtonItem:FunctionComponent<{
    buttonTitle: string,
    buttonPath: string}> = 
    ({buttonTitle, buttonPath}) => {
      console.log("buttonPath", buttonPath)
      return (
        <Link href={buttonPath} >
          <p onClick={() => setActiveItem(buttonTitle)}
          className="text-black hover:text-dark-green inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-light-orange hover:bg-dark-orange dark:bg-light-green dark:hover:bg-dark-green dark:text-white focus:ring-4 focus:outline-none focus:ring-light-green"
          >{buttonTitle}로 이동</p>
        </Link>
      )
    }
     
  return (
        <>
          {show === id && (
            <article className="p-6 bg-white dark:bg-black border border-gray-200 rounded-lg shadow-md">
            <div className="flex items-center text-gray-500">
              <img className="w-1/2 rounded-lg" src={image_path} alt="" />
              <div className="w-1/2 pl-5 lg:pl-10">
                <p className="flex items-center font-bold">
                  <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border rounded-full border-light-green shrink-0">
                    {id}
                  </span>
                  {title}
                </p>
                <h5 className="text-2xl text-black font-bold dark:text-white tracking-tight text-gray-900">
                {name}
                </h5>

                <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                  {description}
                </p>
                  <ButtonItem buttonTitle={buttonTitle} buttonPath={buttonPath} />
                </div>
              </div>
          </article>
          )}
        </>
    )
}

export default ProjectCard;
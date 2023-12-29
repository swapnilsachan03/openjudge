import React from "react"
import { Link, useLocation } from "react-router-dom"

interface TabProps {
  slug: string
  href: string
  children: React.ReactNode
}

const Tab: React.FC<TabProps> = ({ slug, href, children }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(href);

  return (
    <Link to={'/problem/' + slug + href} className={`relative inline-flex items-center justify-center py-3 px-1 border-b-2 text-sm font-medium ${isActive ? 'text-blue-700 border-b-2 border-blue-600' : 'hover:border-gray-300 text-gray-600 hover:text-gray-700 border-transparent'}`}>
      { children }
    </Link>
  )
}

const Content = () => {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];

  if (location.pathname === '/problem/' + slug + '/description') {
    return (
      <div className='w-[1000px] py-8'>
        <p className='mb-6 text-sm font-medium text-gray-500'>
          Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
        </p>

        <p className='mb-6 text-sm font-medium text-gray-500'>
          You may assume that each input would have exactly one solution, and you may not use the same element twice.
        </p>

        <p className='mb-6 text-sm font-medium text-gray-500'>
          You can return the answer in any order.
        </p>

        <p className='mb-6 text-sm font-medium text-gray-500'>
          <b>Example 1:</b>
        </p>

        <p className='mb-6 text-sm font-medium text-gray-500'>
          Input: nums = [2,7,11,15], target = 9
        </p>

        <p className='mb-6 text-sm font-medium text-gray-500'>
          Output: [0,1]
        </p>

        <p className='mb-6 text-sm font-medium text-gray-500'>
          Output: Because nums[0] + nums[1] == 9, we return [0, 1].
        </p>

        <p className='mb-6 text-sm font-medium text-gray-500'>
          <b>Example 2:</b>
        </p>

        <p className='mb-6 text-sm font-medium text-gray-500'>
          Input: nums = [3,2,4], target = 6
        </p>

        <p className='mb-6 text-sm font-medium text-gray-500'>
          Output: [1,2]
        </p>

        <p className='mb-6 text-sm font-medium text-gray-500'>
          <b>Example 3:</b>
        </p>

        <p className='mb-6 text-sm font-medium text-gray-500'>
          Input: nums = [3,3], target = 6
        </p>
      </div>
    )
  } else if (location.pathname === '/problem/' + slug + '/hints') {
    return (
      <div className='w-[1000px] py-8'>
        <h1 className='mb-6 font-bold text-3xl'> Hints </h1>
      </div>
    )
  } else if (location.pathname === '/problem/' + slug + '/submissions') {
    return (
      <div className='w-[1000px] py-8'>
        <h1 className='mb-6 font-bold text-3xl'> Submissions </h1>
      </div>
    )
  } else if (location.pathname === '/problem/' + slug + '/solution') {
    return (
      <div className='w-[1000px] py-8'>
        <h1 className='mb-6 font-bold text-3xl'> Solution </h1>
      </div>
    )
  }
}

const Problem = () => {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  if (location.pathname === '/problem/' + slug) location.pathname = '/problem/' + slug + '/description';

  return (
    <div className='flex flex-row items-center justify-center w-full'>
      <div className='w-[1000px] py-16'>
        <h1 className='mb-6 font-bold text-3xl'> 1. Two Sum </h1>

        <div className="flex flex-row gap-6 text-sm font-medium text-gray-500 border-b border-gray-300">
          <Tab slug={slug} href="/description"> Description </Tab>
          <Tab slug={slug} href="/hints"> Hints </Tab>
          <Tab slug={slug} href="/submissions"> Submissions </Tab>
          <Tab slug={slug} href="/solution"> Solution </Tab>
        </div>
        
        <Content />
      </div>
    </div>
  )
}

export default Problem

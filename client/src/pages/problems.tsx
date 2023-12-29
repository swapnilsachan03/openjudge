import { Link } from "react-router-dom";

const problems = [
  {
    id: 1,
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
  },

  {
    id: 2,
    title: 'Add Two Numbers',
    slug: 'add-two-numbers',
    difficulty: 'Medium',
    tags: ['Linked List', 'Math', 'Recursion'],
  },

  {
    id: 3,
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    tags: ['Hash Table', 'Two Pointers', 'String', 'Sliding Window'],
  },

  {
    id: 4,
    title: 'Median of Two Sorted Arrays',
    slug: 'median-of-two-sorted-arrays',
    difficulty: 'Hard',
    tags: ['Array', 'Binary Search', 'Divide and Conquer'],
  },

  {
    id: 5,
    title: 'Longest Palindromic Substring',
    slug: 'longest-palindromic-substring',
    difficulty: 'Medium',
    tags: ['String', 'Dynamic Programming'],
  }
];

const Problems = () => {
  return (
    <div className='flex flex-row items-center justify-center w-full'>
      <div className='w-[1000px] py-16'>
        <h1 className='mb-10 font-bold text-3xl'> Problems </h1>

        <table className='w-full'>
          <thead className='border-b-2 border-gray-200'>
            <tr className='text-sm font-medium text-gray-700 uppercase'>
              <th className='pb-4 w-20'> # </th>
              <th className='pb-4'> Title </th>
              <th className='pb-4 w-36 text-left'> Difficulty </th>
              <th className='pb-4 w-60'> Tags </th>
            </tr>
          </thead>
  
          <tbody>
            <tr className='h-2'></tr>
            { problems.map(problem => (
              <tr className='text-sm font-medium text-gray-600' key={problem.id}>
                <td className='py-3 text-center'> { problem.id } </td>
                
                <td className='py-3'>
                  <Link to={ '/problem/' + problem.slug } className='hover:text-gray-900'>
                    { problem.title }
                  </Link>
                </td>

                <td className='py-3'> { problem.difficulty } </td>
                <td className='my-3 w-60 line-clamp-1 overflow-clip'>
                  { problem.tags.map((tag, index) => (
                    <span key={index}> { tag  + ', ' } </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Problems

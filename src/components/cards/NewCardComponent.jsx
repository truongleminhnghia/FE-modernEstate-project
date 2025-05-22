// src/components/cards/NewCardComponent.jsx
import React from 'react'
import { Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const NewCardComponent = ({
  image,
  avatar,
  author,
  date,
  title,
  description,
  to
}) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={image}
        alt="thumbnail"
        className="w-full h-[180px] object-cover"
      />
      <div className="flex items-center px-4 py-3">
        <img
          src={avatar}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <div className="ml-3 text-sm text-gray-600 flex items-center">
          <span className="font-medium text-gray-800">{author}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
      </div>
      <div className="px-4 pb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {description}
        </p>
        <Link to={to}>
          <Button
            type="primary"
            size="small"
            shape="round"
            icon={<RightOutlined />}
          >
            Xem thêm
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NewCardComponent

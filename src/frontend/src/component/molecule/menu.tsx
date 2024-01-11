import React from 'react'
import { MdOutlineClose } from 'react-icons/md'

import { idolColorData } from '../atom/idoldata'
import MenuItem from '../atom/menuitem'
import IdolsList from './idolslist'

type MenuProps = {
	isOpen: boolean
	onClose: () => void
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => (
	<>
		{isOpen && (
			<div
				className="fixed inset-0 bg-black bg-opacity-50 z-40"
				onClick={onClose}
			></div>
		)}
		<div
			className={`fixed inset-y-0 right-0 w-9/12 max-w-sm bg-white transform ${
				isOpen ? 'translate-x-0' : 'translate-x-full'
			} transition-transform duration-300 ease-in-out z-50 shadow-md p-4 text-gray-600`}
		>
			<div className="flex justify-end p-3">
				<MdOutlineClose
					className="text-black cursor-pointer"
					size={24}
					onClick={onClose}
				/>
			</div>
			{/* 以下はログイン機能実装あとに利用する */}
			{/* <div className="flex flex-row justify-center p-4">
				<button className="w-28 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
					Log In
				</button>
				<button className="w-28 border text-indigo-500 border-blue-500 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg ml-5">
					Sign Up
				</button>
			</div> */}
			<ul className="divide-y divide-gray-300">
				<MenuItem to="/" label="TOP" />
				<MenuItem to="/about" label="ABOUT" />
				<MenuItem to="/idols" label="IDOL LIST" />
				<MenuItem to="" label="SETTINGS" />
			</ul>
			{/* アイドルの表示制御 */}

			<div className="pt-4">
				<div className="font-bold">表示アイドルの設定</div>
				<div className="text-gray-800">
					<IdolsList idols={idolColorData} />
				</div>
			</div>
		</div>
	</>
)

export default Menu

import React from 'react'
import { FaTwitter } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import { IdolSocialData } from './idoldata'

const column = ['idol name', 'url', 'twitter']

const data = IdolSocialData

const Table: React.FC = () => {
	return (
		<div className="flex flex-col">
			<div className="overflow-x-auto">
				<div className="p-1.5 w-full inline-block align-middle">
					<div className="overflow-hidden border rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									{column.map((item) => (
										<th
											key={item}
											scope="col"
											className="px-4 py-3 text-xs font-bold text-center text-gray-500 uppercase"
										>
											{item}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{data.map((item) => (
									<tr key={item.id}>
										<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
											{item.name}
										</td>
										<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
											<a href={item.url}>
												<div className="hidden md:inline-block">
													{item.url}
												</div>
												<div className="grid place-content-center md:hidden">
													<FiExternalLink />
												</div>
											</a>
										</td>
										<td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
											<a href={item.twitter}>
												<div className="hidden md:inline-block">
													{item.twitter}
												</div>
												<div className="grid place-content-center md:hidden">
													<FaTwitter />
												</div>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Table

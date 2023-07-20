import React from "react";
import { IpProps } from "../library/Types";

const Card = ({ ipData }: IpProps) => {
	if (!ipData) return null;

	const { ip, location, isp } = ipData;

	return (
		<article className="p-8">
			<div
				className="bg-white rounded-xl p-8 shadow-xl max-w-6xl mx-auto grid grid-cols-1 gap-5 text-center md:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:text-left mb-10 relative lg:-mb-32"
				style={{
					zIndex: 40,
				}}>
				<div className="lg:border-r lg:border-slate-400 p-6">
					<h2 className="text-sm uppercase text-slate-600">
						IP Address
					</h2>
					<p className="font-bold text-slate-900 text-2xl">
						{ip}
					</p>
				</div>

				{location && (
					<>
						<div className="lg:border-r lg:border-slate-400 lg:p-6">
							<h2 className="text-sm uppercase text-slate-600">
								Location
							</h2>
							<p className="font-bold text-slate-900 text-2xl">
								{location.city}, {location.region}
							</p>
						</div>
						<div className="lg:border-r lg:border-slate-400 p-6">
							<h2 className="text-sm uppercase text-slate-600">
								Timezone
							</h2>
							<p className="font-bold text-slate-900 text-2xl">
								UTC {location.timezone}
							</p>
						</div>
					</>
				)}

				<div className="lg:p-6">
					<h2 className="text-sm uppercase text-slate-600">
						ISP
					</h2>
					<p className="font-bold text-slate-900 text-2xl">
						{isp}
					</p>
				</div>
			</div>
		</article>
	);
};

export default Card;

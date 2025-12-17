export default function Page() {
	return (
		<>
			<div className='flex min-h-screen items-center justify-center flex-col gap-4'>
				<button className='btn p btn--dark'>
					<span className='btn__label btn__label--main'>Download</span>
					<span aria-hidden='true' className='btn__label btn__label--ghost'>
						Download
					</span>
				</button>
				<button className="bg-[#0f0] text-white p-2 rounded-md">Button 2</button>
			</div>
		</>
	);
}

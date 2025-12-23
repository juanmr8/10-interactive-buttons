'use client';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
gsap.registerPlugin(SplitText);

export default function Page() {
	return (
		<>
			<div className='grid min-h-screen px-8 lg:grid-cols-2'>
				<div className='flex items-center justify-center border-r border-b lg:col-span-1'>
					<ButtonC2MTL />
				</div>
				<div className='flex items-center justify-center border-b'>
					<ButtonTelescope />
				</div>
				<div className='flex items-center justify-center border-r border-b lg:col-span-1'>
					<ButtonOsmo />
				</div>
				<div className='flex items-center justify-center border-b lg:col-span-1'>
					<ButtonDrake />
				</div>
			</div>
		</>
	);
}

const ButtonC2MTL = ({ content = 'Download' }: { content?: string }) => {
	return (
		<button className='group relative cursor-pointer overflow-hidden rounded-md bg-[#141414] text-[18px] whitespace-nowrap text-white *:ease-[cubic-bezier(1,0,0.25,0.995)] *:group-hover:ease-[cubic-bezier(0.19,1,0.22,1)] [&>span]:block [&>span]:px-4 [&>span]:py-2 [&>span]:duration-800'>
			<span className='transition-transform group-hover:-translate-y-full'>
				{content}
			</span>
			<span
				aria-hidden='true'
				className='absolute inset-0 z-2 translate-y-full text-black group-hover:translate-y-0 group-hover:transition-transform'
			>
				{content}
			</span>
			<div className='absolute inset-0 origin-bottom scale-y-0 bg-[#0f0] transition-transform duration-600 group-hover:scale-y-100' />
		</button>
	);
};

const ButtonTelescope = ({ content = 'Download' }: { content?: string }) => {
	const pathRef = useRef<SVGPathElement>(null);
	const animationRef = useRef<number | null>(null);
	const progressRef = useRef(0);
	const textRef = useRef<HTMLSpanElement>(null);

	const charsEffect = () => {
		const tl = gsap.timeline();
		const split = SplitText.create(textRef.current, {
			type: 'chars',
		});
		tl.to(split.chars, {
			y: '-4px',
			duration: 0.15,
			stagger: 0.05,
		}).to(split.chars, {
			y: '0',
			duration: 0.15,
			stagger: 0.05,
		});
	};

	// Simplified path - create points for interpolation
	const getPath = (stretch: number) => {
		// Define key points with stretch multiplier
		// Center points stretch more, edges barely move
		const centerStretch = stretch * 12; // Max stretch for center

		return `
			M69,-0.001
			C69,${9.465 - stretch * 2} 66.646,${18.71 - stretch * 4} 62.255,${26.497 - stretch * 6}
			C62.255,${26.497 - stretch * 6} 32,${27 + centerStretch * 0.7} -1.5,${27 + centerStretch}
			C-35,${27 + centerStretch * 0.7} -62.255,${26.497 - stretch * 6} -62.255,${26.497 - stretch * 6}
			C-66.648,${18.71 - stretch * 4} -69,${9.467 - stretch * 2} -69,-0.001
			C-69,${-9.47 + stretch * 2} -66.648,${-18.713 + stretch * 4} -62.255,${-26.5 + stretch * 6}
			C-62.255,${-26.5 + stretch * 6} -35,${-26.5 - centerStretch * 0.7} -0.125,${-26.5 - centerStretch}
			C34.75,${-26.5 - centerStretch * 0.7} 62.255,${-26.5 + stretch * 6} 62.255,${-26.5 + stretch * 6}
			C66.648,${-18.713 + stretch * 4} 69,${-9.47 + stretch * 2} 69,-0.001z
		`;
	};

	const animate = (targetProgress: number, onComplete?: () => void) => {
		const speed = 0.1;
		const update = () => {
			const diff = targetProgress - progressRef.current;
			if (Math.abs(diff) > 0.08) {
				progressRef.current += diff * speed;
				if (pathRef.current) {
					pathRef.current.setAttribute('d', getPath(progressRef.current));
				}
				animationRef.current = requestAnimationFrame(update);
			} else {
				progressRef.current = targetProgress;
				if (pathRef.current) {
					pathRef.current.setAttribute('d', getPath(targetProgress));
				}
				// Clear animation ref if no callback (end of animation sequence)
				if (!onComplete) {
					animationRef.current = null;
				}
				if (onComplete) {
					onComplete();
				}
			}
		};
		update();
	};

	const handleMouseEnter = () => {
		// Don't restart if already animating
		if (animationRef.current !== null) {
			return;
		}
		charsEffect();
		// Animate to 1, then overshoot to negative (bounce), then back to 0
		animate(1, () => {
			animate(-0.75, () => {
				animate(0);
			});
		});
	};

	return (
		<button
			onMouseEnter={handleMouseEnter}
			className='group relative h-[2.65rem] cursor-pointer overflow-visible px-4 font-mono uppercase'
		>
			<span
				ref={textRef}
				className='relative z-10 transition-colors duration-300 group-hover:text-white'
			>
				{content}
			</span>
			<svg
				className='absolute -top-3 -left-3 -z-10 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)]'
				viewBox='-74 -32 148 64'
			>
				<path
					ref={pathRef}
					fill='rgb(227,247,147)'
					d={getPath(0)}
					className='transition-[fill] duration-500 group-hover:fill-black'
				/>
			</svg>
		</button>
	);
};

const ButtonOsmo = ({ content = 'Download' }: { content?: string }) => {
	return (
		<button className='btn-osmo relative overflow-hidden rounded-sm bg-[#A1FF62] font-mono text-[18px] uppercase'>
			<div className='span-visible px-5 py-4'>
				<span>{content}</span>
			</div>
			<div
				className='span-hidden absolute top-0 left-0 block h-full w-full px-5 py-4'
				style={{
					transform: 'translateX(-100%) translateY(10px) rotate(-20deg)',
				}}
			>
				<span>{content}</span>
			</div>
		</button>
	);
};

const ButtonDrake = ({ content = 'Download' }: { content?: string }) => {
	return (
		<button className='group relative flex items-center overflow-hidden font-mono text-[18px] uppercase'>
			<div className="relative flex items-center rounded-sm px-5 py-4 before:absolute before:inset-0 before:z-[3] before:h-full before:w-full before:rounded-sm before:border before:border-black before:bg-white before:transition-all before:duration-300 before:content-[''] group-hover:before:w-[calc(100%+56px)]">
				<span className='relative z-10 transition-all duration-300 group-hover:translate-x-[25px]'>
					{content}
				</span>
			</div>
			<div className="relative flex aspect-square h-full items-center justify-center rounded-full p-5 before:absolute before:inset-0 before:z-[2] before:aspect-square before:h-full before:rounded-full before:border before:border-black before:transition-all before:duration-300 before:content-[''] group-hover:before:translate-x-[-5px]">
				<ArrowRight className='z-10 size-4' />
			</div>
		</button>
	);
};

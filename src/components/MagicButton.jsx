import React from 'react';

/**
 *  UI: border magic from tailwind css btns
 *  Link: https://ui.aceternity.com/components/tailwindcss-buttons
 *
 *  change border radius to rounded-lg
 *  add margin of md:mt-10
 *  remove focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
 */
const MagicButton = ({ title = null, icon, position, handleClick, textClasses, buttonClasses = 'interactable', bg = 'bg-slate-700' }) => {
    return (
        <button className={` relative inline-flex h-14 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none ${buttonClasses}`} onClick={handleClick}>
            <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#bf61ff_0%,#00cea8_50%,#bf61ff_100%)]' />

            {/* remove px-3 py-1, add px-5 gap-2 */}
            <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg px-7 text-lg font-bold text-white backdrop-blur-3xl gap-2 ${textClasses}`}>
                {position === 'left' && icon}
                {title}
                {position === 'right' && icon}
            </span>
        </button>
    );
};

export default MagicButton;

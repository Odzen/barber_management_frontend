/*Arreglo con la ruta, nombre e icono a mostrar de cada módulo*/

export const Links = [
  {
    to: '/main',
    text: 'Dashboard',
    svg: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 11.1111H8.88889V0H0V11.1111ZM0 20H8.88889V13.3333H0V20ZM11.1111 20H20V8.88889H11.1111V20ZM11.1111 0V6.66667H20V0H11.1111Z'
          fill='white'
        />
      </svg>
    )
  },
  {
    to: '/staff',
    text: 'Barberos',
    svg: (
      <svg
        width='25'
        height='25'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M12.2563 5.1062H7.1875V16.675H12.2563V5.1062Z' fill='#F4F4F4' />
        <path
          d='M12.2563 3.7251L7.1875 6.1751V7.5251L12.2563 5.0751V3.7251ZM12.2563 8.5751L7.1875 11.0313V12.3813L12.2563 9.93135V8.5751ZM7.1875 15.8813L12.2563 13.4313V14.7813L7.1875 17.2313V15.8813Z'
          fill='#00A6ED'
        />
        <path
          d='M7.1875 8.5999L12.2563 6.1499V7.4999L7.1875 9.9499V8.5999ZM7.1875 13.4562L12.2563 11.0062V12.3562L7.1875 14.8062V13.4562Z'
          fill='#CA0B4A'
        />
        <path
          d='M7.15 3.0249H12.25C13.0938 3.0249 13.775 3.70615 13.775 4.5499C13.775 5.39365 13.0938 6.0749 12.25 6.0749H7.15C6.30625 6.0749 5.625 5.39365 5.625 4.5499C5.625 3.70615 6.30625 3.0249 7.15 3.0249ZM7.15 15.7124H12.25C13.0938 15.7124 13.775 16.3937 13.775 17.2374C13.775 18.0812 13.0938 18.7624 12.25 18.7624H7.15C6.30625 18.7624 5.625 18.0812 5.625 17.2374C5.625 16.3937 6.30625 15.7124 7.15 15.7124Z'
          fill='#9B9B9B'
        />
        <path
          d='M10.4625 1.25H8.91875C7.94375 1.25 7.15625 2.0375 7.15625 3.0125H12.225C12.225 2.04375 11.4375 1.25 10.4625 1.25Z'
          fill='#D3D3D3'
        />
      </svg>
    )
  },
  {
    to: '/customers',
    text: 'Clientes',
    svg: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path>
        <circle cx='9' cy='7' r='4'></circle>
        <path d='M23 21v-2a4 4 0 0 0-3-3.87'></path>
        <path d='M16 3.13a4 4 0 0 1 0 7.75'></path>
      </svg>
    )
  },
  {
    to: '/profile',
    text: 'Mi perfil',
    svg: (
      <svg
        width='27'
        height='27'
        viewBox='0 0 20 20'
        fill='white'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85794 14.1421 2.50002 10 2.50002C5.85794 2.50002 2.50002 5.85794 2.50002 10C2.50002 14.1421 5.85794 17.5 10 17.5ZM10 18.3334C14.6025 18.3334 18.3334 14.6025 18.3334 10C18.3334 5.39752 14.6025 1.66669 10 1.66669C5.39752 1.66669 1.66669 5.39752 1.66669 10C1.66669 14.6025 5.39752 18.3334 10 18.3334Z'
          fill='white'
        />
        <path
          d='M5 14.8459C5 14.4154 5.32167 14.0517 5.75 14.0042C8.96458 13.6484 11.05 13.6804 14.2575 14.0121C14.4177 14.0289 14.5695 14.092 14.6944 14.1937C14.8193 14.2954 14.9119 14.4312 14.9608 14.5847C15.0098 14.7381 15.013 14.9025 14.9701 15.0577C14.9272 15.2129 14.84 15.3523 14.7192 15.4588C10.9338 18.7584 8.77042 18.7129 5.26667 15.4621C5.09583 15.3038 5 15.0784 5 14.8459Z'
          fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M14.2146 14.4263C11.0325 14.0971 8.97713 14.0663 5.79546 14.4184C5.69073 14.4306 5.59418 14.481 5.52429 14.5599C5.45441 14.6389 5.4161 14.7408 5.41671 14.8463C5.41671 14.9654 5.46629 15.0784 5.55004 15.1567C7.28671 16.7675 8.60254 17.4954 9.88879 17.5C11.1796 17.5046 12.5663 16.7825 14.4455 15.145C14.5052 15.0919 14.5481 15.0226 14.5692 14.9455C14.5902 14.8684 14.5884 14.7868 14.5639 14.7107C14.5395 14.6346 14.4934 14.5673 14.4314 14.5168C14.3694 14.4664 14.2941 14.4347 14.2146 14.4263ZM5.70421 13.59C8.95254 13.2304 11.0684 13.2629 14.3009 13.5975C14.5418 13.6227 14.7702 13.7175 14.9581 13.8705C15.146 14.0235 15.2852 14.2279 15.3587 14.4587C15.4322 14.6896 15.4367 14.9369 15.3719 15.1703C15.307 15.4037 15.1755 15.6131 14.9934 15.7729C13.0871 17.4346 11.4996 18.3396 9.88629 18.3334C8.26838 18.3275 6.75088 17.4071 4.98379 15.7675C4.85727 15.6497 4.75641 15.507 4.68752 15.3484C4.61862 15.1899 4.58317 15.0188 4.58338 14.8459C4.58277 14.5352 4.69679 14.2353 4.90361 14.0034C5.11043 13.7716 5.3955 13.6247 5.70421 13.59Z'
          fill='white'
        />
        <path
          d='M13.3334 8.33333C13.3334 9.21739 12.9822 10.0652 12.357 10.6904C11.7319 11.3155 10.8841 11.6667 10 11.6667C9.11597 11.6667 8.26812 11.3155 7.643 10.6904C7.01788 10.0652 6.66669 9.21739 6.66669 8.33333C6.66669 7.44928 7.01788 6.60143 7.643 5.97631C8.26812 5.35119 9.11597 5 10 5C10.8841 5 11.7319 5.35119 12.357 5.97631C12.9822 6.60143 13.3334 7.44928 13.3334 8.33333Z'
          fill='white'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10 10.8333C10.6631 10.8333 11.2989 10.5699 11.7678 10.1011C12.2366 9.63226 12.5 8.99637 12.5 8.33333C12.5 7.67029 12.2366 7.03441 11.7678 6.56557C11.2989 6.09673 10.6631 5.83333 10 5.83333C9.33698 5.83333 8.70109 6.09673 8.23225 6.56557C7.76341 7.03441 7.50002 7.67029 7.50002 8.33333C7.50002 8.99637 7.76341 9.63226 8.23225 10.1011C8.70109 10.5699 9.33698 10.8333 10 10.8333ZM10 11.6667C10.8841 11.6667 11.7319 11.3155 12.357 10.6904C12.9822 10.0652 13.3334 9.21739 13.3334 8.33333C13.3334 7.44928 12.9822 6.60143 12.357 5.97631C11.7319 5.35119 10.8841 5 10 5C9.11597 5 8.26812 5.35119 7.643 5.97631C7.01788 6.60143 6.66669 7.44928 6.66669 8.33333C6.66669 9.21739 7.01788 10.0652 7.643 10.6904C8.26812 11.3155 9.11597 11.6667 10 11.6667Z'
          fill='black'
        />
      </svg>
    )
  }
]

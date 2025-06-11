import React, { useState, useRef, useEffect } from "react";
import "./ProjectDetailsPage.css";
import { useParams, Link } from "react-router-dom";
import { MessageOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import MessagePopup from '../../components/popup/MessagePopup';
import ChatPopup from '../../components/popup/ChatPopup';
import { Carousel } from 'antd';
import axios from 'axios';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

export function MaterialSymbolsSchool(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M21 17v-6.9L12 15L1 9l11-6l11 6v8zm-9 4l-7-3.8v-5l7 3.8l7-3.8v5z"></path></svg>);
}

export function IconParkSolidShopping(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48" {...props}><g fill="none"><path fill="currentColor" d="M39 32H13L8 12h36z"></path><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M3 6h3.5L8 12m0 0l5 20h26l5-20z"></path><circle cx={13} cy={39} r={3} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}></circle><circle cx={39} cy={39} r={3} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}></circle></g></svg>);
}

export function RiCarFill(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M19 20H5v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-9l2.513-6.702A2 2 0 0 1 6.386 4h11.228a2 2 0 0 1 1.873 1.298L22 12v9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zM4.136 12h15.728l-2.25-6H6.386zM6.5 17a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m11 0a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path></svg>);
}

export function IcSharpMedicalServices(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M16 6V2H8v4H2v16h20V6zm-6-2h4v2h-4zm6 11h-3v3h-2v-3H8v-2h3v-3h2v3h3z"></path></svg>);
}

export function MdiBank(props) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M11.5 1L2 6v2h19V6m-5 4v7h3v-7M2 22h19v-3H2m8-9v7h3v-7m-9 0v7h3v-7z"></path></svg>);
}

export function PhPark(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M232 192h-32v-24h24a8 8 0 0 0 7.76-9.94l-32-128a8 8 0 0 0-15.52 0l-32 128A8 8 0 0 0 160 168h24v24h-64v-16h8a8 8 0 0 0 0-16h-8v-16h8a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16h8v16h-8a8 8 0 0 0 0 16h8v16H24a8 8 0 0 0 0 16h208a8 8 0 0 0 0-16M192 65l21.75 87h-43.5ZM64 144h40v16H64Zm0 32h40v16H64Zm52-80a28 28 0 1 0-28-28a28 28 0 0 0 28 28m0-40a12 12 0 1 1-12 12a12 12 0 0 1 12-12"></path></svg>);
}

export function SolarMailboxOutline(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" fillRule="evenodd" d="M18.372 3.03a2.45 2.45 0 0 0-1.345-.12l-.277.053v1.655a3.95 3.95 0 0 1 2.16.194c.428.165.892.206 1.34.12V3.275a3.7 3.7 0 0 1-1.8-.214zM16.75 6.145l.277-.054a2.45 2.45 0 0 1 1.345.12a3.95 3.95 0 0 0 2.344.154l.067-.016c.567-.136.967-.644.967-1.228v-2.22c0-.77-.72-1.336-1.468-1.156c-.429.103-.88.074-1.292-.085l-.08-.03a3.95 3.95 0 0 0-2.166-.193l-.486.093a1.24 1.24 0 0 0-1.008 1.22v3.5H7a1 1 0 0 0-.136.012A5.25 5.25 0 0 0 1.25 11.5v5.267a2.983 2.983 0 0 0 2.983 2.983H9.75V22a.75.75 0 0 0 1.5 0v-2.25h2.5V22a.75.75 0 0 0 1.5 0v-2.25h4.543a2.957 2.957 0 0 0 2.957-2.957V11.5c0-2.9-2.35-5.25-5.25-5.25h-.75zm-1.5 1.604V11a.75.75 0 0 0 1.5 0V7.75h.75a3.75 3.75 0 0 1 3.75 3.75v5.293c0 .804-.652 1.457-1.457 1.457H11.75V11.5c0-1.47-.603-2.798-1.576-3.75zm-5 10.5V11.5a3.75 3.75 0 1 0-7.5 0v5.267c0 .819.664 1.483 1.483 1.483zm-6-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 1 1 0 1.5H5a.75.75 0 0 1-.75-.75" clipRule="evenodd"></path></svg>);
}

export function FluentBeach24Regular(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M9.35 5.321a6.75 6.75 0 0 1 11.692 6.75l-.25.434a.75.75 0 0 1-1.025.274l-4.558-2.632l-2.373 4.153c1.905.225 3.59 1.21 4.843 2.614a2 2 0 0 0-1.3.802C15.214 16.508 13.666 15.75 12 15.75s-3.214.758-4.38 1.966a2 2 0 0 0-1.299-.802c1.24-1.39 2.903-2.368 4.783-2.607l2.806-4.91l-4.535-2.618A.75.75 0 0 1 9.1 5.754zm1.43.537l1.966 1.135c.534-.819 1.074-1.493 1.743-2.102a11 11 0 0 1 1.826-1.325a5.25 5.25 0 0 0-5.535 2.292m5.81 3.354c.554-.997.82-1.79.916-2.555c.077-.62.047-1.255-.064-2.01c-.818.46-1.43.887-1.944 1.354c-.533.485-.981 1.031-1.451 1.743zm1.299.75l1.974 1.14a5.25 5.25 0 0 0-.857-6.02a8 8 0 0 1-.012 1.761c-.126 1.01-.476 1.993-1.105 3.12M6.714 18.66a.75.75 0 0 0-1.444.056c-.21.891-.607 1.364-1.041 1.634c-.46.286-1.05.401-1.729.401a.75.75 0 0 0 0 1.5c.822 0 1.73-.135 2.521-.627a3.5 3.5 0 0 0 1.062-1.029c1.552 1.866 4.41 1.857 5.917-.029c1.534 1.919 4.466 1.895 5.997-.07c.848 1.108 2.17 1.755 3.503 1.755a.75.75 0 1 0 0-1.5c-1.183 0-2.384-.797-2.784-2.084a.75.75 0 0 0-1.43-.007c-.784 2.44-3.81 2.399-4.575.104a.75.75 0 0 0-1.422 0c-.765 2.295-3.791 2.335-4.575-.104"></path></svg>);
}

export function MynauiReceptionBell(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 19h18M12 8V5m0 3h-2a5 5 0 0 0-5 5v3h14v-3a5 5 0 0 0-5-5zm0-3h-2m2 0h2"></path></svg>);
}

export function HugeiconsPrisonGuard(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} color="currentColor"><path d="M18 8c-1.671-.628-3.749-1-6-1s-4.329.372-6 1"></path><path d="m6.97 8l-.73-1.413c-.579-1.12-.868-1.68-.686-2.176c.182-.495.743-.673 1.865-1.027l3.97-1.255c.272-.086.407-.129.546-.129s.275.043.546.129l4.238 1.34c1.01.319 1.516.478 1.708.927c.193.448-.014.983-.428 2.051L17.398 8M7 8v1.725c0 1.793.921 3.455 2.428 4.378l.514.315a3.93 3.93 0 0 0 4.116 0l.515-.315A5.13 5.13 0 0 0 17 9.725V8m-2 6l1 3m0 0l-1.369 1.195c-1.254 1.096-1.88 1.643-2.631 1.643s-1.377-.547-2.631-1.643L8 17m8 0l1.734.578c.998.333 1.497.5 1.94.756a5 5 0 0 1 1.167.936C21.188 19.647 22 21 22 22M9 14l-1 3m0 0l-1.734.578c-.998.333-1.497.5-1.94.756a5 5 0 0 0-1.167.936C2.812 19.647 2 21 2 22"></path></g></svg>);
}

export function HealthiconsCleaningOutline(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48" {...props}><g fill="currentColor"><path fillRule="evenodd" d="M22.062 25.602L11.33 5.416a1 1 0 1 1 1.766-.939l10.733 20.186l1.522-.81a4 4 0 0 1 5.41 1.655l.648 1.218l6.869 10.055l-14.249 7.576l-4.495-11.318l-.647-1.218a4 4 0 0 1 1.654-5.41zm-.583 2.575l4.81-2.557a2 2 0 0 1 2.705.827l.648 1.217l-8.343 4.436l-.647-1.218a2 2 0 0 1 .827-2.705m.83 6.432l2.753 6.933l1.834-.975l-2.165-4.215l1.78-.914l2.152 4.19l6.702-3.564l-4.208-6.16z" clipRule="evenodd"></path><path d="M16.36 35.231a1 1 0 0 1 1.28 1.537l-.001.001l-.002.002l-.003.002l-.01.008l-.03.025l-.103.079q-.131.1-.367.26c-.315.21-.77.484-1.344.758A11.15 11.15 0 0 1 11 39a1 1 0 1 1 0-2a9.15 9.15 0 0 0 3.92-.903a9 9 0 0 0 1.094-.617a6 6 0 0 0 .337-.24l.01-.01zm3.195 6.601a1 1 0 0 0-1.11-1.664l-.002.002l-.02.012l-.086.055q-.119.075-.349.207a14 14 0 0 1-1.27.642C15.65 41.561 14.299 42 13 42a1 1 0 1 0 0 2c1.702 0 3.35-.561 4.531-1.086a16 16 0 0 0 1.863-.979l.114-.072l.032-.021l.01-.006z"></path></g></svg>);
}

export function MaterialSymbolsLightFireTruckOutlineSharp(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M6.996 20.23q-1.092 0-1.852-.762q-.76-.763-.76-1.852H2V11h11V6h3.5V4.692h2V6h1.764L22 11.148v6.468h-2.384q0 1.09-.765 1.852t-1.855.763t-1.852-.763t-.76-1.852H9.616q0 1.096-.765 1.855q-.764.76-1.856.76m.005-1q.675 0 1.145-.47t.47-1.136t-.47-1.145T7 16t-1.145.48t-.47 1.145t.47 1.136T7 19.23m10 0q.675 0 1.145-.47t.47-1.136t-.47-1.145T17 16t-1.145.48t-.47 1.145t.47 1.136t1.145.47M3 12v4.616h1.64q.272-.725.914-1.17Q6.196 15 7 15t1.446.445t.913 1.17H13V12zm11 4.616h.64q.271-.725.914-1.17Q16.196 15 17 15t1.446.445t.913 1.17H21V12h-7zM14 11h6.9l-1.33-4H14zM2 10v-.885h1v-2.23H2V6h9.385v.885h-1v2.23h1V10zm1.885-.885H6.25v-2.23H3.884zm3.25 0H9.5v-2.23H7.134zM13 12H3zm1 0h7z"></path></svg>);
}

export function MaterialSymbolsCameraOutlineRounded(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M12.275 9H19.4q-.675-1.725-2.062-2.963T14.15 4.3l-2.3 3.95q-.15.25 0 .5t.425.25m-3.6 1.25q.15.25.425.25t.425-.25L13.1 4.1q-.275-.05-.55-.075T12 4q-1.65 0-3.075.625T6.4 6.3zM4.25 14h4.575q.275 0 .438-.25t.012-.5L5.7 7.1q-.8 1.025-1.25 2.263T4 12q0 .525.063 1.013T4.25 14m5.6 5.7l2.275-3.95q.15-.25-.012-.5t-.438-.25H4.6q.675 1.725 2.063 2.963T9.85 19.7M12 20q1.65 0 3.075-.625T17.6 17.7l-2.275-3.95q-.15-.25-.425-.25t-.425.25L10.9 19.9q.275.05.538.075T12 20m6.3-3.1q.8-1.025 1.25-2.262T20 12q0-.525-.062-1.012T19.75 10h-4.575q-.275 0-.437.25t-.013.5zM12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.788-3.887t2.15-3.175t3.187-2.15T12 2q2.075 0 3.888.788t3.174 2.15t2.15 3.175T22 12q0 2.05-.788 3.875t-2.15 3.188t-3.175 2.15T12 22"></path></svg>);
}

export function GuidanceWaitingRoom(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" d="M18 3v2h2M1 19.5h7M7.5 14V6.5H6.328a3 3 0 0 0-2.906 2.255L1.5 16.25v.25h9V18c0 1.5 0 2.5.75 4c0 0 .75 1.5 1.75 1.5m5-14a4.5 4.5 0 1 1 0-9a4.5 4.5 0 0 1 0 9Zm-10.65-5s-1.6-1-1.6-2.25a1.747 1.747 0 1 1 3.496 0C9.246 3.5 7.65 4.5 7.65 4.5z" strokeWidth={1}></path></svg>);
}

export function IconParkOutlineSchool(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48" {...props}><g fill="none" stroke="currentColor" strokeWidth={4}><path strokeLinejoin="round" d="M4 33a2 2 0 0 1 2-2h6v-7l12-8l12 8v7h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4z"></path><path strokeLinecap="round" d="M24 6v10"></path><path strokeLinecap="round" strokeLinejoin="round" d="M36 12V6s-1.5 3-6 0s-6 0-6 0v6s1.5-3 6 0s6 0 6 0m-8 32V31h-8v13m-2 0h12"></path></g></svg>);
}

export function HealthiconsHospitalOutline(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48" {...props}><g fill="currentColor"><path d="M20 20h-4v3h4zm-4 5h4v3h-4zm4 5h-4v3h4zm2-10h4v3h-4zm4 5h-4v3h4zm-4 5h4v3h-4zm10-10h-4v3h4zm-4 5h4v3h-4zm4 5h-4v3h4zm-7-15v-3h3v-2h-3V7h-2v3h-3v2h3v3z"></path><path fillRule="evenodd" d="M17 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2h8v2h-2v34h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2V8h-1V6zm0 5h-4v31h4v-4h-1v-2h16v2h-1v4h4V11h-4v5a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2zm0-2h-4V8h4zm2-3h10v10H19zm4 36h-4v-4h4zm6 0v-4h-4v4zm6-33V8h-4v1z" clipRule="evenodd"></path></g></svg>);
}

export function LucideSchool(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M14 22v-4a2 2 0 1 0-4 0v4"></path><path d="m18 10l3.447 1.724a1 1 0 0 1 .553.894V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.382a1 1 0 0 1 .553-.894L6 10m12-5v17M4 6l7.106-3.553a2 2 0 0 1 1.788 0L20 6M6 5v17"></path><circle cx={12} cy={9} r={2}></circle></g></svg>);
}

export function CilMedicalCross(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 512 512" {...props}><path fill="currentColor" d="M344 16H168v152H16v176h152v152h176V344h152V168H344Zm120 184v112H312v152H200V312H48V200h152V48h112v152Z"></path></svg>);
}

export function StreamlinePlumpHotSpring(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3}><path d="M10 27.292C5.704 28.94 3 31.335 3 34c0 4.97 9.402 9 21 9s21-4.03 21-9c0-1.437-.786-2.795-2.183-4"></path><path d="M24 3c-4 4.694-4 12.306 0 17s4 12.306 0 17M13 7c-4 3.59-4 9.41 0 13s4 9.41 0 13M35 7c-4 3.59-4 9.41 0 13s4 9.41 0 13"></path></g></svg>);
}

export function MdiCinema(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M4 15h2a2 2 0 0 1 2 2v2h1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2h1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2h1v3H1v-3h1v-2a2 2 0 0 1 2-2m7-8l4 3l-4 3zM4 2h16a2 2 0 0 1 2 2v9.54a3.9 3.9 0 0 0-2-.54V4H4v9c-.73 0-1.41.19-2 .54V4a2 2 0 0 1 2-2"></path></svg>);
}

export function MapAmusementPark(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 50 50" {...props}><path fill="currentColor" d="M39.922 28.087c.463.227 1.027.223 1.253-.011c.229-.233.031-.601-.438-.817l-8.178-3.788c-.469-.218-1.257-.273-1.749-.125l-2.925.877c-.497.149-1.145.271-1.439.271s-.539-.414-.539-.922v-8.919c0-.507.423-.923.941-.923h21.209c.52 0 .942-.415.942-.923V9.812c0-.508-.407-1.042-.902-1.187L25.762 2.108c-.495-.145-1.307-.145-1.802.002L1.899 8.624C1.405 8.769 1 9.305 1 9.812v2.994c0 .508.423.923.94.923h20.93c.518 0 .941.416.941.923v8.924a.936.936 0 0 1-.941.924h-.38c-.518.001-1.244-.289-1.616-.643l-5.046-4.819c-.373-.355-1.099-.644-1.617-.644h-2.334c-.516 0-1.139-.305-1.382-.676c-.241-.372-.803-.674-1.248-.674s-.582.348-.302.776l.044.067c.28.427.281 1.13.006 1.559L6.471 23.37a1.13 1.13 0 0 0 .196 1.402l.179.161c.385.34 1.071.428 1.53.191l2.704-1.407c.46-.238 1.061-.083 1.34.344l2.967 4.542a1.07 1.07 0 0 1-.208 1.376l-1.357 1.133c-.395.328-.625 1.001-.511 1.498l1.759 7.652c.114.497.619.8 1.121.675l1.223-.302a.96.96 0 0 0 .709-1.128l-1.191-5.175a.98.98 0 0 1 .702-1.146l3.007-.806a8.6 8.6 0 0 1 1.849-.241h.38c.518 0 .941.415.941.92v9.177a.934.934 0 0 1-.941.921H1.94a.934.934 0 0 0-.94.924v2.992c0 .513.423.927.94.927h45.728c.518 0 .94-.414.94-.925v-2.992a.934.934 0 0 0-.94-.924H26.849a.933.933 0 0 1-.941-.921v-9.177c0-.505.423-.92.941-.92h1.084c.518 0 1.345.107 1.848.241l3.007.806c.502.133.818.65.702 1.146l-1.188 5.175a.953.953 0 0 0 .705 1.128l1.225.302a.915.915 0 0 0 1.12-.675l1.761-7.652c.117-.497-.105-1.16-.488-1.482c-.382-.318-.719-.996-.749-1.502l-.153-2.707c-.031-.506.326-.735.79-.507z"></path></svg>);
}

export function CarbonBar(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 32 32" {...props}><path fill="currentColor" d="M25 11H15a1 1 0 0 0-1 1v4a6.005 6.005 0 0 0 5 5.91V28h-3v2h8v-2h-3v-6.09A6.005 6.005 0 0 0 26 16v-4a1 1 0 0 0-1-1m-1 5a4 4 0 0 1-8 0v-3h8Z"></path><path fill="currentColor" d="M15 1h-5a1 1 0 0 0-1 1v7.37A6.09 6.09 0 0 0 6 15v14a1 1 0 0 0 1 1h5v-2H8V15c0-3.187 2.231-4.02 2.316-4.051L11 10.72V3h3v5h2V2a1 1 0 0 0-1-1"></path></svg>);
}

export function IonLibraryOutline(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 512 512" {...props}><rect width={64} height={368} x={32} y={96} fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={32} rx={16} ry={16}></rect><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M112 224h128M112 400h128"></path><rect width={128} height={304} x={112} y={160} fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={32} rx={16} ry={16}></rect><rect width={96} height={416} x={256} y={48} fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={32} rx={16} ry={16}></rect><path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={32} d="m422.46 96.11l-40.4 4.25c-11.12 1.17-19.18 11.57-17.93 23.1l34.92 321.59c1.26 11.53 11.37 20 22.49 18.84l40.4-4.25c11.12-1.17 19.18-11.57 17.93-23.1L445 115c-1.31-11.58-11.42-20.06-22.54-18.89Z"></path></svg>);
}

export function HugeiconsMenuRestaurant(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} color="currentColor"><path d="M20 18v-8c0-1.886 0-2.829-.586-3.414C18.828 6 17.886 6 16 6H4v12c0 1.885 0 2.828.586 3.414S6.114 22 8 22h8c1.886 0 2.828 0 3.414-.586S20 19.885 20 18"></path><path d="M12 11a3 3 0 0 1 3 3m-3-3a3 3 0 0 0-3 3m3-3v-1m3 4H9m6 0h1m-7 0H8m0 4h8M4 6l7.385-3.094c1.649-.691 2.473-1.037 3.13-.86a2 2 0 0 1 1.07.717C16 3.305 16 4.203 16 6"></path></g></svg>);
}

export function StreamlineCyberStoreSale(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} strokeWidth={1}><path d="M18.5 19.5h-2v-5h2m-2 3h2m-6-3v5h2m-8-5h-2v2l2 1v2h-2"></path><path d="M20.5 13.5v9h-18v-9m-2 9h22"></path><path d="M8.5 19.5V16l1-1.5l1 1.5v3.5m-2-2h2m12-10H.5l3-5h16zm-19 0l3-5m1 5l2-5m2 5v-5m0 7.5l-2 1.5l-2-1.5l-2 1.5l-2-1.5L2 11.5L.5 10V7.5m3 2.5V7.5m8 2.5V7.5m-4 2.5V7.5m12 0l-3-5m-1 5l-2-5m-2 7.5l2 1.5l2-1.5l2 1.5l2-1.5l1.5 1.5l1.5-1.5V7.5m-3 2.5V7.5m-4 2.486V7.5"></path></g></svg>);
}

export function LucideLabCoffee(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h1a4 4 0 1 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Zm1-4a1 1 0 0 1 1-1a1 1 0 0 0 1-1m4 2a1 1 0 0 1 1-1a1 1 0 0 0 1-1m4 2a1 1 0 0 1 1-1a1 1 0 0 0 1-1"></path></svg>);
}

export function HealthiconsMarketStall(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 48 48" {...props}><g fill="currentColor"><path fillRule="evenodd" d="M9.263 6c-.378 0-.715.262-.845.656L6.11 13.667a2.2 2.2 0 0 0-.11.687v2.789C6 18.72 7.151 20 8.571 20s2.572-1.28 2.572-2.857c0 1.578 1.151 2.857 2.571 2.857s2.572-1.28 2.572-2.857c0 1.578 1.151 2.857 2.571 2.857s2.57-1.278 2.572-2.855C21.429 18.722 22.58 20 24 20s2.571-1.28 2.571-2.857c0 1.578 1.152 2.857 2.572 2.857C40.849 20 42 18.72 42 17.143v-2.789a2.2 2.2 0 0 0-.11-.687l-2.308-7.01c-.13-.395-.467-.657-.845-.657z" clipRule="evenodd"></path><path fillRule="evenodd" d="M10 21.23V29H7.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h33a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H38v-7.77a3.9 3.9 0 0 1-1.143-.703a4 4 0 0 1-.857.576V29H12v-7.897a4 4 0 0 1-.857-.576c-.336.295-.72.535-1.143.703m26-1.957q.127-.127.24-.273H36zM37.474 19a2.8 2.8 0 0 0 .526.519V19zM10 19.519a2.6 2.6 0 0 0 .526-.519H10zM11.76 19H12v.273a3 3 0 0 1-.24-.273M8.5 33a.5.5 0 0 0-.5.5V41a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1v-7.5a.5.5 0 0 0-.5-.5z" clipRule="evenodd"></path><path d="M14 26.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z"></path><path d="M16 27.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm8 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"></path></g></svg>);
}

export function MaterialSymbolsLocalAtmOutline(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M11 17h2v-1h1q.425 0 .713-.288T15 15v-3q0-.425-.288-.712T14 11h-3v-1h4V8h-2V7h-2v1h-1q-.425 0-.712.288T9 9v3q0 .425.288.713T10 13h3v1H9v2h2zm-7 3q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm0-2h16V6H4zm0 0V6z"></path></svg>);
}

export function IconoirShoppingBag(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m19.26 9.696l1.385 9A2 2 0 0 1 18.67 21H5.33a2 2 0 0 1-1.977-2.304l1.385-9A2 2 0 0 1 6.716 8h10.568a2 2 0 0 1 1.977 1.696M14 5a2 2 0 1 0-4 0"></path></svg>);
}

export function HugeiconsPool(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 21h-1c-1.451 0-2.722-.859-3-2c-.278 1.141-1.549 2-3 2s-2.722-.859-3-2c-.278 1.141-1.549 2-3 2s-2.722-.859-3-2c-.278 1.141-1.549 2-3 2H2M19 3l-.265.088c-1.32.44-1.98.66-2.357 1.184S16 5.492 16 6.883V17M11 3l-.265.088c-1.32.44-1.98.66-2.357 1.184S8 5.492 8 6.883V17M8 7h8m-8 4h8m-8 4h8" color="currentColor"></path></svg>);
}

export function VaadinGolf(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16" {...props}><path fill="currentColor" d="M7 2a2 2 0 1 1-3.999.001A2 2 0 0 1 7 2"></path><path fill="currentColor" d="M9.8 1.8c-.2-.5-1.7-.1-2 .5c-.2.3-.2 1.2-1.2 1.9c-.8.5-1.6.5-1.6.5c-.3.6-.1 1.1.2 1.6c.5.9.6 1.8.7 2.8c.1 1.3-.5 2.4-2.3 3.2c-.8.3-1.3.9-1 1.9c0 0 2-.3 3.1-1.2c1.5-1.2 1.8-2.3 1.8-2.3s.1.7 0 1.9c-.1 1-.2 1.5-.4 2.2S7.4 16 8 16s1-.4 1-1l.3-1.9c.3-2.1 0-4.3-.8-6.3c0-.1-.1-.1-.1-.2c-.6-1.6.2-2.6.6-3c.3-.4 1.2-1.2.8-1.8M12 0v10h1V4l3-2zm4 10a1 1 0 1 1-2 0a1 1 0 0 1 2 0M1 8.4l3.7-3.7l-.7-.3L.2 8s-.4.7.1 1.7s1.6.3 1.6.3c.4-.2.2-.4 0-.6s-.9-1-.9-1"></path></svg>);
}

export function MaterialSymbolsPool(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M2 21v-2q.95 0 1.425-.5T5.3 18t1.925.5t1.425.5t1.425-.5T12 18t1.925.5t1.425.5t1.425-.5T18.7 18t1.875.5T22 19v2q-1.475 0-1.937-.5T18.7 20t-1.425.5t-1.925.5t-1.925-.5T12 20t-1.425.5t-1.925.5t-1.925-.5T5.3 20t-1.363.5T2 21m0-4.5v-2q.95 0 1.425-.5t1.875-.5t1.938.5t1.412.5q.9 0 1.425-.5T12 13.5t1.925.5t1.425.5t1.425-.5t1.925-.5t1.875.5t1.425.5v2q-1.475 0-1.937-.5t-1.363-.5t-1.388.5t-1.962.5q-1.425 0-1.937-.5T12 15.5q-.95 0-1.412.5t-1.938.5t-1.963-.5t-1.387-.5t-1.362.5T2 16.5m4.9-5.1l3.325-3.325l-1-1q-.825-.825-1.75-1.2T5.2 5.5V3q1.875 0 3.1.413T10.7 5l6.4 6.4q-.425.275-.825.438T15.35 12q-.9 0-1.425-.5T12 11t-1.925.5t-1.425.5q-.525 0-.925-.162T6.9 11.4M16.7 3q1.05 0 1.775.738T19.2 5.5q0 1.05-.725 1.775T16.7 8t-1.775-.725T14.2 5.5q0-1.025.725-1.763T16.7 3"></path></svg>);
}

export function MaterialSymbolsFitnessCenter(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M13.4 21.9L12 20.5l3.55-3.55l-8.5-8.5L3.5 12l-1.4-1.4l1.4-1.45l-1.4-1.4l2.1-2.1L2.8 4.2l1.4-1.4l1.45 1.4l2.1-2.1l1.4 1.4l1.45-1.4L12 3.5L8.45 7.05l8.5 8.5L20.5 12l1.4 1.4l-1.4 1.45l1.4 1.4l-2.1 2.1l1.4 1.45l-1.4 1.4l-1.45-1.4l-2.1 2.1l-1.4-1.4z"></path></svg>);
}

export function SolarBasketballLinear(props) {
	return (<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M3.34 17c2.76 4.783 8.876 6.42 13.66 3.66a9.96 9.96 0 0 0 4.196-4.731a9.99 9.99 0 0 0-.536-8.93a9.99 9.99 0 0 0-7.465-4.928A9.96 9.96 0 0 0 7 3.339C2.217 6.101.578 12.217 3.34 17Z"></path><path strokeLinecap="round" d="M16.95 20.573S16.01 13.982 14 10.5S7.05 3.427 7.05 3.427"></path><path strokeLinecap="round" d="M21.864 12.58c-5.411-1.187-12.805 3.768-14.287 8.238m8.837-17.609c-1.488 4.42-8.74 9.303-14.125 8.243"></path></g></svg>);
}

const containerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 10.762622,
  lng: 106.660172,
};

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLocationTab, setActiveLocationTab] = useState('school');
  const [activeCategoryTab, setActiveCategoryTab] = useState('kindergarten');
  const [showPopup, setShowPopup] = useState(false);
  const [currentPopupView, setCurrentPopupView] = useState('message');
  const [location, setLocation] = useState(null);
  const carouselRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDH65U1tsUHeWw-XMgtSyaVU9Sh4QO4J1o",
  });

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://222.255.117.195:8443/api/v1/projects/${id}`);
        const projectData = response.data?.data;
        
        if (projectData) {
          setProject({
            id: projectData.id,
            name: projectData.title,
            status: projectData.status?.replace(/_/g, " "),
            area: `${projectData.projectArea?.toLocaleString()} ${projectData.unitArea || "m²"}`,
            address: projectData.address?.addressDetail || "Địa chỉ không rõ",
            company: projectData.invetor?.companyName || "Chủ đầu tư không rõ",
            image: projectData.images?.[0]?.imageUrl || "https://via.placeholder.com/300x200.png?text=No+Image",
            type: projectData.typeProject,
            description: projectData.description,
          });

          // Geocode the address
          if (projectData.address?.addressDetail) {
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              projectData.address.addressDetail
            )}&key=AIzaSyDH65U1tsUHeWw-XMgtSyaVU9Sh4QO4J1o`;

            try {
              const response = await fetch(geocodeUrl);
              const data = await response.json();
              if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                setLocation({ lat, lng });
              }
            } catch (error) {
              console.error("Lỗi khi tìm địa chỉ:", error);
            }
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("Không thể tải thông tin dự án");
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="project-details-container">
        <div className="loading-text">Đang tải thông tin dự án...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-details-container">
        <div className="error-text">{error}</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-details-container">
        <div className="error-text">Không tìm thấy thông tin dự án</div>
      </div>
    );
  }

  const nearbyProjects = [
    {
      id: 1,
      title: "BÁN GẤP CĂN HỘ CAO CẤP CHUNG CƯ MASTERI AN PHÚ, TP...",
      price: "25 triệu/tháng",
      area: "50 m²",
      bedrooms: "3 PN",
      bathrooms: "2 WC",
      location: "Q.2, TP Hồ Chí Minh",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "CĂN HỘ CAO CẤP VINHOMES CENTRAL PARK",
      price: "35 triệu/tháng",
      area: "65 m²",
      bedrooms: "2 PN",
      bathrooms: "2 WC",
      location: "Q. Bình Thạnh, TP Hồ Chí Minh",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "CHUNG CƯ THE SUN AVENUE QUẬN 7",
      price: "28 triệu/tháng",
      area: "55 m²",
      bedrooms: "2 PN",
      bathrooms: "1 WC",
      location: "Q.7, TP Hồ Chí Minh",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      title: "CĂN HỘ VINHOMES GOLDEN RIVER",
      price: "45 triệu/tháng",
      area: "75 m²",
      bedrooms: "3 PN",
      bathrooms: "2 WC",
      location: "Q.1, TP Hồ Chí Minh",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 5,
      title: "CHUNG CƯ THE MARQUIS NGUYỄN HỮU CẢNH",
      price: "32 triệu/tháng",
      area: "60 m²",
      bedrooms: "2 PN",
      bathrooms: "2 WC",
      location: "Q. Bình Thạnh, TP Hồ Chí Minh",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60"
    }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLocationTabChange = (tab) => {
    setActiveLocationTab(tab);
  };

  const handleCategoryTabChange = (tab) => {
    setActiveCategoryTab(tab);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    if (!showPopup) {
      setCurrentPopupView('message');
    }
  };

  const switchToChatView = () => {
    setCurrentPopupView('chat');
  };

  const switchToMessageView = () => {
    setCurrentPopupView('message');
  };

  return (
    <div className="project-details-bg">

      <div className="project-details-header-row">
        <div className="project-details-breadcrumb">
          <Link to="/">Trang chủ</Link> / <Link to="/du-an"> Dự án</Link> / <span> Chi tiết dự án</span>
        </div>
        <div className="project-details-header-content">
          <div className="project-details-header-images-group">
            <div className="project-details-header-main-img-wrap">
              <img src={project.image} alt="main" className="project-details-header-main-img" />
            </div>
            <div className="project-details-header-thumbs">
              <img src={project.image} alt="img1" className="project-details-header-thumb" />
              <img src={project.image} alt="img2" className="project-details-header-thumb" />
              <img src={project.image} alt="img3" className="project-details-header-thumb" />
              <div className="project-details-header-thumb project-details-header-thumb-last">
                <img src={project.image} alt="img4" className="project-details-header-thumb-img" />
                <span className="project-details-header-thumb-more">Xem 8 ảnh</span>
              </div>
            </div>
          </div>
          <div className="project-details-header-info-box">
            <div className="project-details-header-title">{project.name}</div>
            <div className="project-details-header-address">{project.address}</div>
            <hr className="project-details-header-hr" />
            <div className="project-details-header-info-list">
              <div><b>Giá từ:</b> <span>{project.price || 'Đang cập nhật'}</span></div>
              <div><b>Chủ đầu tư:</b> <span>{project.company}</span></div>
              <div><b>Loại hình:</b> <span>{project.type}</span></div>
            </div>
          </div>
        </div>
      </div>
      {/* Thông tin chi tiết dự án bên dưới */}
      <div className="project-details-container">
        <div className="sidebar-right">

          <div className="project-details-section-row">
            {/* LEFT: Project Info */}
            <div className="project-details-section-main">
              <div className="project-details-section-label">THÔNG TIN DỰ ÁN</div>
              <div className="project-details-section-title">Tổng quan dự án {project.name}</div>
              <div className={`project-details-section-content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="project-details-summary-table">
                  <div className="project-details-summary-grid">
                    <div className="project-details-summary-row">
                      <div><b>Giá từ:</b> {project.price || 'Đang cập nhật'}</div>
                      <div><b>Chủ đầu tư:</b> {project.company}</div>
                      <div><b>Thời gian khởi công:</b> {project.startDate || 'Đang cập nhật'}</div>
                      <div><b>Số tòa nhà:</b> {project.numberOfBuildings || 'Đang cập nhật'}</div>
                      <div><b>Các loại diện tích:</b> {project.areaTypes || 'Đang cập nhật'}</div>
                    </div>
                    <div className="project-details-summary-row">
                      <div><b>Diện tích khu đất:</b> {project.totalArea || 'Đang cập nhật'}</div>
                      <div><b>Diện tích xây dựng:</b> {project.builtArea || 'Đang cập nhật'}</div>
                      <div><b>Thời gian hoàn thành:</b> {project.completionDate || 'Đang cập nhật'}</div>
                      <div><b>Số sản phẩm:</b> {project.numberOfProducts || 'Đang cập nhật'}</div>
                      <div><b>Trạng thái:</b> {project.status || 'Đang cập nhật'}</div>
                    </div>
                  </div>
                </div>
                <div className="project-details-desc">
                  <b>Dự án {project.name}</b> {project.description}
                </div>
                <div className="project-details-map-container">
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={location || defaultCenter}
                      zoom={15}
                    >
                      <Marker position={location || defaultCenter} />
                    </GoogleMap>
                  ) : (
                    <div>Loading map...</div>
                  )}
                </div>
                <div className="project-details-img-caption">
                  (Vị trí dự án {project.name})
                </div>
                <div className="project-details-desc">
                  {project.detailedDescription || project.description}
                </div>
                <ul className="project-details-list"> 
                  <li><b>Dự án:</b> {project.name}</li>
                  <li><b>Vị trí:</b> {project.address}</li>
                  <li><b>Chủ đầu tư:</b> {project.company}</li>
                  <li><b>Tổng diện tích:</b> {project.totalArea || 'Đang cập nhật'}</li>
                  <li><b>Diện tích xây dựng:</b> {project.builtArea || 'Đang cập nhật'}</li>
                  <li><b>Mật độ xây dựng:</b> {project.buildingDensity || 'Đang cập nhật'}</li>
                  <li><b>Loại hình:</b> {project.type}</li>
                  <li><b>Số lượng sản phẩm:</b> {project.numberOfProducts || 'Đang cập nhật'}</li>
                  <li><b>Diện tích căn hộ:</b> {project.areaTypes || 'Đang cập nhật'}</li>
                  <li><b>Pháp lý:</b> {project.legalStatus || 'Đang cập nhật'}</li>
                </ul>
                <div className="project-details-collapse">
                  <span onClick={toggleCollapse}>{isCollapsed ? 'Mở rộng ▼' : 'Thu gọn ▲'}</span>
                </div>
                {isCollapsed && (
                  <div className="project-details-expand-overlay">
                    <button className="project-details-expand-btn" onClick={toggleCollapse}>
                      Mở rộng ▼
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Section: Vị trí dự án */}
            <div className="project-location-section">
              <div className="project-location-section-title">Vị trí dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
              <div className="project-location-box">
                <div className="project-location-tabs">
                  <button
                    className={`project-location-tab ${activeLocationTab === 'school' ? 'project-location-tab-active' : ''}`}
                    onClick={() => handleLocationTabChange('school')}
                  >
                    <div className="symbol">
                      <MaterialSymbolsSchool />
                      Trường học
                    </div>
                  </button>
                  <button
                    className={`project-location-tab ${activeLocationTab === 'market' ? 'project-location-tab-active' : ''}`}
                    onClick={() => handleLocationTabChange('market')}
                  >
                    <div className="symbol">
                      <IconParkSolidShopping />
                      Siêu thị
                    </div>
                  </button>
                  <button
                    className={`project-location-tab ${activeLocationTab === 'station' ? 'project-location-tab-active' : ''}`}
                    onClick={() => handleLocationTabChange('station')}
                  >
                    <div className="symbol">
                      <RiCarFill />
                      Bến xe tàu
                    </div>

                  </button>
                  <button
                    className={`project-location-tab ${activeLocationTab === 'hospital' ? 'project-location-tab-active' : ''}`}
                    onClick={() => handleLocationTabChange('hospital')}
                  >
                    <div className="symbol">
                      <IcSharpMedicalServices />
                      Y tế
                    </div>

                  </button>
                  <button
                    className={`project-location-tab ${activeLocationTab === 'bank' ? 'project-location-tab-active' : ''}`}
                    onClick={() => handleLocationTabChange('bank')}
                  >
                    <div className="symbol">
                      <MdiBank />
                      Ngân hàng
                    </div>

                  </button>
                </div>

                <div className="project-location-map-wrap">
                  <img
                    src="/src/assets/images/map.jpg"
                    alt="Bản đồ vị trí dự án"
                    className="project-location-map"
                  />
                </div>

                <div className="project-location-category-header">
                  <div
                    className={`project-location-category-item ${activeCategoryTab === 'kindergarten' ? 'project-location-category-item-active' : ''}`}
                    onClick={() => handleCategoryTabChange('kindergarten')}
                  >
                    Trường mầm non
                  </div>
                  <div
                    className={`project-location-category-item ${activeCategoryTab === 'primary' ? 'project-location-category-item-active' : ''}`}
                    onClick={() => handleCategoryTabChange('primary')}
                  >
                    Trường Tiểu học
                  </div>
                  <div
                    className={`project-location-category-item ${activeCategoryTab === 'secondary' ? 'project-location-category-item-active' : ''}`}
                    onClick={() => handleCategoryTabChange('secondary')}
                  >
                    THCS & THPT
                  </div>
                  <div
                    className={`project-location-category-item ${activeCategoryTab === 'university' ? 'project-location-category-item-active' : ''}`}
                    onClick={() => handleCategoryTabChange('university')}
                  >
                    Trường Đại học
                  </div>
                </div>

                <div className="project-location-list-table">
                  <div className="project-location-list-row">
                    <div className="project-location-list-left">
                      <span className="project-location-list-icon"><i className="fas fa-school"></i></span>
                      <div className="symbol">
                        <MaterialSymbolsSchool />
                        <div className="project-location-list-details">
                          <span className="project-location-list-name">Trường Mầm non Song ngữ Global Kids - Cơ sở 3</span>
                          <span className="project-location-list-address">Thành phố Dĩ An, TP.HCM</span>
                        </div>

                      </div>
                    </div>
                    <div className="project-location-list-right">
                      <span className="project-location-list-distance"><i className="fas fa-map-marker-alt"></i> 2.5km</span>
                      <span className="project-location-list-time"><i className="far fa-clock"></i> 1 phút</span>
                    </div>
                  </div>
                  <div className="project-location-list-row">
                    <div className="project-location-list-left">
                      <span className="project-location-list-icon"><i className="fas fa-school"></i></span>
                      <div className="symbol">
                        <MaterialSymbolsSchool />
                        <div className="project-location-list-details">
                          <span className="project-location-list-name">Trường Mầm non Quốc tế Grow Montessori - An Phú</span>
                          <span className="project-location-list-address">Thành phố Dĩ An, TP.HCM</span>
                        </div>
                      </div>
                    </div>
                    <div className="project-location-list-right">
                      <span className="project-location-list-distance"><i className="fas fa-map-marker-alt"></i> 2.7km</span>
                      <span className="project-location-list-time"><i className="far fa-clock"></i> 1 phút</span>
                    </div>
                  </div>
                  <div className="project-location-list-row">
                    <div className="project-location-list-left">
                      <span className="project-location-list-icon"><i className="fas fa-school"></i></span>
                      <div className="symbol">
                        <MaterialSymbolsSchool />
                        <div className="project-location-list-details">
                          <span className="project-location-list-name">Trường Mầm non Montessori Academy - Thảo Điền</span>
                          <span className="project-location-list-address">Thành phố Dĩ An, TP.HCM</span>
                        </div>
                      </div>
                    </div>
                    <div className="project-location-list-right">
                      <span className="project-location-list-distance"><i className="fas fa-map-marker-alt"></i> 2.9km</span>
                      <span className="project-location-list-time"><i className="far fa-clock"></i> 1 phút</span>
                    </div>
                  </div>
                  <div className="project-location-list-row">
                    <div className="project-location-list-left">
                      <span className="project-location-list-icon"><i className="fas fa-school"></i></span>
                      <div className="symbol">
                        <MaterialSymbolsSchool />
                        <div className="project-location-list-details">
                          <span className="project-location-list-name">Trường Mầm non Song ngữ WIS - Cơ sở Bàu Thắng Hai</span>
                          <span className="project-location-list-address">Thành phố Dĩ An, TP.HCM</span>
                        </div>
                      </div>
                    </div>
                    <div className="project-location-list-right">
                      <span className="project-location-list-distance"><i className="fas fa-map-marker-alt"></i> 3.2km</span>
                      <span className="project-location-list-time"><i className="far fa-clock"></i> 1 phút</span>
                    </div>
                  </div>
                  <div className="project-location-list-row">
                    <div className="project-location-list-left">
                      <span className="project-location-list-icon"><i className="fas fa-university"></i></span>
                      <div className="symbol">
                        <MaterialSymbolsSchool />
                        <div className="project-location-list-details">
                          <span className="project-location-list-name">Trường Đại học Tài chính - Marketing</span>
                          <span className="project-location-list-address">Thành phố Dĩ An, TP.HCM</span>
                        </div>
                      </div>
                    </div>
                    <div className="project-location-list-right">
                      <span className="project-location-list-distance"><i className="fas fa-map-marker-alt"></i> 3.5km</span>
                      <span className="project-location-list-time"><i className="far fa-clock"></i> 1 phút</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="project-location-desc-box">
                <div className="project-location-desc">
                  Dự án do Gamuda Land phát triển tọa lạc trên mặt đường đôi Nguyễn Khuyến, cách mặt đường Nguyễn Trãi – Trần Phú khoảng 50m chưa đầy 50 giây xe máy, đây là vị trí được giới chuyên gia bất động sản Modern Estate đánh giá là vị trí vàng khi hạ tầng – Thủy quận tại và đồng thời là "mảnh đất cuối cùng" ở quận Hà Đông.
                </div>
                <div className="project-location-sodo-box">
                  <img src="/src/assets/images/ap2.jpg" />
                  <div className="project-location-sodo-caption">(Sơ đồ vị trí dự án)</div>
                </div>
                <div className="project-location-desc">Với vị trí giao thông thuận lợi, Dự án do Gamuda Land phát triển còn nằm gần hệ thống các trung tâm chăm sóc sức khỏe, trung tâm thể dục thể thao hiện đại và hệ sinh thái môi trường trong lành của hồ Văn Quán, hồ Con Tằm….và thuận tiện trong việc kết nối.</div>
                <div className="project-location-tienich-list">
                  <div className="project-location-tienich-item"><span className="project-location-tienich-dot"></span>Cách hồ văn quán 150m, view toàn cảnh hồ văn quán cư dân có thỏa thích ngắm pháo hoa các dịp tết hàng năm ngay tại ban công nhà mình với tầm view toàn cảnh hồ văn quán.</div>
                  <div className="project-location-tienich-item"><span className="project-location-tienich-dot"></span>Cách khu đô thị mỗ lao, làng việt kiều châu Âu, Khu Đô Thị Chung Cư Quốc Tế Booyoung Hàn Quốc 500m.</div>
                  <div className="project-location-tienich-item"><span className="project-location-tienich-dot"></span>Sát ngay cạnh Học Viện An Ninh, Đại Học Kiến Trúc, Học Viện Bưu Chính Viễn Thông.</div>
                  <div className="project-location-tienich-item"><span className="project-location-tienich-dot"></span>Ga tàu điện Metro Q. Hà Đông: Cách 1.1km - Chợ Hà Đông cách 1.3km - Cách Bệnh Viện Hà Đông: 1.73km - Cách TT hành chính Quận Hà Đông: 1.2km - Cách Siêu thị Mê Linh Plaza Hà Đông: 1km, Cách Bệnh Viện 103: 1km.</div>
                </div>
              </div>

            </div>
            {/* Section: Mặt bằng */}
            <div className="project-matbang-section">
              <div className="project-matbang-title">Mặt bằng Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
              <div className="project-matbang-box">
                <div className="project-matbang-subtitle">Mặt bằng tổng thể</div>
                <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60" alt="Mặt bằng tổng thể" className="project-matbang-img" />
              </div>
            </div>
            {/* Section: Mặt bằng chi tiết */}
            <div className="project-matbang-details-section">
              <div className="project-matbang-details-desc">
                Ariyana Lakeside Văn Quán (Hesco Văn Quán) có thiết kế cực kỳ đặc biệt mang phong cách Châu Âu với diện tích xây dựng là 3199.88m2. Các căn hộ được bố trí hài hòa, không gian mở mang lại cảm giác thông thoáng, tràn ngập ánh sáng tự nhiên cho từng căn hộ.
              </div>
              <div className="project-matbang-details-image-box">
                <img src="/src/assets/images/ap2.jpg" alt="" />
                <div className="project-matbang-details-caption">Mặt bằng của dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
              </div>
              <div className="project-matbang-details-desc">
                Với diện tích mỗi căn hộ giao động từ 87-134 m2 và được thiết kế kế từ 2-3 phòng ngủ có gần 1.024 căn hộ chung cư cao cấp đáp ứng số lượng lớn khách hàng có nhu cầu trong tương lai. Dự án được liên doanh bởi hai công ty là công ty cổ phần thiết bị Thủy Lợi (HESCO) & Tập đoàn phát triển nhà và đô thị Thăng Long cùng nhau hợp tác xây dựng dựa trên Quyết định của UBND TP số 4132-QĐ/UBND ngày 06/07/2017 với vốn đầu tư hơn 1000 tỷ đồng, mật độ xây dựng 55,6%.
              </div>
              <div className="project-matbang-details-image-box">
                <img src="/src/assets/images/ap3.jpg" />
                <div className="project-matbang-details-caption">Các căn hộ được thiết kế tối ưu, tiết kiệm diện tích nhưng không mang lại cảm giác gò bó mà làm cho người dùng cảm nhận được không gian thoải mái sinh hoạt cho gia đình. Đặc biệt, hành lang rộng, thông thoáng, khả năng thông gió và chống cháy tốt cũng là một ưu điểm mà Ariyana Lakeside Văn Quán (Hesco Văn Quán) đưa đến giúp cho cư dân tương lai ở đây càng thêm yêu thích.</div>
              </div>
              <div className="project-matbang-details-desc">
                Các căn hộ được thiết kế tối ưu, tiết kiệm diện tích nhưng không mang lại cảm giác gò bó mà làm cho người dùng cảm nhận được không gian thoải mái sinh hoạt cho gia đình. Đặc biệt, hành lang rộng, thông thoáng, khả năng thông gió và chống cháy tốt cũng là một ưu điểm mà Ariyana Lakeside Văn Quán (Hesco Văn Quán) đưa đến giúp cho cư dân tương lai ở đây càng thêm yêu thích.
              </div>
            </div>

            {/* Section: Tiện ích dự án */}
            <div className="project-tienich-box">
              <div className="project-tienich-title">Tiện ích dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
              <div className="project-tienich-section">
                <div className="project-tienich-grid">
                  <div className="project-tienich-category-box">
                    <div className="project-tienich-category-title">Cơ sở vật chất</div>
                    <div className="project-tienich-items-container">
                      <div className="project-tienich-item"><i className="symbol"><PhPark/></i> Công viên</div>
                      <div className="project-tienich-item"><i className="symbol"><SolarMailboxOutline/></i> Hộp thư dân cư</div>
                      <div className="project-tienich-item"><i className="symbol"><FluentBeach24Regular/></i> Bỏ rác</div>
                    </div>
                  </div>
                  <div className="project-tienich-category-box">
                    <div className="project-tienich-category-title">An ninh, vệ sinh</div>
                    <div className="project-tienich-items-container">
                      <div className="project-tienich-item"><i className="symbol"><MynauiReceptionBell/></i> Lễ tân</div>
                      <div className="project-tienich-item"><i className="symbol"><HugeiconsPrisonGuard/></i> An ninh bảo vệ</div>
                      <div className="project-tienich-item"><i className="symbol"><HealthiconsCleaningOutline/></i> Dọn vệ sinh</div>
                      <div className="project-tienich-item"><i className="symbol"><MaterialSymbolsLightFireTruckOutlineSharp/></i> Hệ thống PCCC</div>
                      <div className="project-tienich-item"><i className="symbol"><MaterialSymbolsCameraOutlineRounded/></i> Camera giám sát</div>
                      <div className="project-tienich-item"><i className="symbol"><GuidanceWaitingRoom/></i> Phòng (lảnh) chờ</div>
                    </div>
                  </div>
                  <div className="project-tienich-category-box">
                    <div className="project-tienich-category-title">Y tế, giáo dục</div>
                    <div className="project-tienich-items-container">
                      <div className="project-tienich-item"><i className="symbol"><IconParkOutlineSchool/></i> Trường học cấp 1,2,3</div>
                      <div className="project-tienich-item"><i className="symbol"><HealthiconsHospitalOutline/></i> Bệnh viện, phòng khám</div>
                      <div className="project-tienich-item"><i className="symbol"><LucideSchool/></i> Trường mầm non</div>
                      <div className="project-tienich-item"><i className="symbol"><CilMedicalCross/></i> Nhà thuốc, quầy thuốc</div>
                    </div>
                  </div>
                  <div className="project-tienich-category-box">
                    <div className="project-tienich-category-title">Giải trí</div>
                    <div className="project-tienich-items-container">
                      <div className="project-tienich-item"><i className="symbol"><StreamlinePlumpHotSpring/></i> Làm đẹp, spa</div>
                      <div className="project-tienich-item"><i className="sumbol"><MdiCinema/></i> Rạp chiếu phim</div>
                      <div className="project-tienich-item"><i className="symbol"><MapAmusementPark/></i> Khu vui chơi trẻ em</div>
                      <div className="project-tienich-item"><i className="symbol"><CarbonBar/></i> Bar</div>
                      <div className="project-tienich-item"><i className="symbol"><IonLibraryOutline/></i> Thư viện</div>
                    </div>
                  </div>
                  <div className="project-tienich-category-box">
                    <div className="project-tienich-category-title">Tiêu dùng, ẩm thực</div>
                    <div className="project-tienich-items-container">
                      <div className="project-tienich-item"><i className="symbol"><HugeiconsMenuRestaurant/></i> Nhà hàng</div>
                      <div className="project-tienich-item"><i className="symbol"><StreamlineCyberStoreSale/></i> Shop thời trang</div>
                      <div className="project-tienich-item"><i className="symbol"><LucideLabCoffee/></i> Coffee shop</div>
                      <div className="project-tienich-item"><i className="symbol"><HealthiconsMarketStall/></i> Chợ</div>
                      <div className="project-tienich-item"><i className="symbol"><MaterialSymbolsLocalAtmOutline/></i> ATM</div>
                      <div className="project-tienich-item"><i className="symbol"><IconoirShoppingBag/></i> Trung tâm thương mại</div>
                    </div>
                  </div>
                  <div className="project-tienich-category-box">
                    <div className="project-tienich-category-title">Thể Thao</div>
                    <div className="project-tienich-items-container">
                      <div className="project-tienich-item"><i className="symbol"><HugeiconsPool/></i> Bể bơi trong nhà</div>
                      <div className="project-tienich-item"><i className="symbol"><VaadinGolf/></i> Sân Golf</div>
                      <div className="project-tienich-item"><i className="symbol"><MaterialSymbolsPool/></i> Bể bơi ngoài trời</div>
                      <div className="project-tienich-item"><i className="symbol"><MaterialSymbolsFitnessCenter/></i> Fitness</div>
                      <div className="project-tienich-item"><i className="symbol"><SolarBasketballLinear/></i> Sân bóng rổ</div>
                    </div>
                  </div>
                </div>
                <div className="project-tienich-desc">
                  Dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán) là dự án tiện ích 5 sao hướng rất nhiều hệ thống tiện ích đẳng cấp có sẵn như: Nhà hàng, khu vui chơi, spa, khu thể dục... kiến tạo cuộc sống của cư dân tại đây trở nên viên mãn hơn. Hứa hẹn trong thời gian tới, Ariyana Lakeside Văn Quán (Hesco Văn Quán) sẽ là điểm nhấn Trung tâm du lịch, dịch vụ, vui chơi, giải trí, hoạt động kinh doanh, thương mại,... phía tây Hà Nội.
                </div>
                <div className="project-tienich-image-box">
                  <img src="/src/assets/images/ap4.jpg" />
                  <div className="project-tienich-caption">Tiện ích Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
                </div>
                <div className="project-tienich-list">
                  <ul>
                    <li>5 bể bơi nội khu</li>
                    <li>Sân bóng chuyền</li>
                    <li>Khu BBQ</li>
                    <li>Vườn Hawaii</li>
                    <li>Khu vui chơi trẻ em</li>
                    <li>Nhà cộng đồng, thư viện</li>
                    <li>Phòng tập đa năng</li>
                    <li>CLB cờ tướng, cờ vua</li>
                    <li>S-Coffee</li>
                    <li>Nhà hàng Á, Â, Việt</li>
                  </ul>
                </div>
                <div className="project-tienich-image-box">
                  <img src="/src/assets/images/ap1.jpg" />
                  <div className="project-tienich-caption">Tiện ích Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
                </div>
              </div>
            </div>
            {/* Section: Tiến độ dự án */}
            <div className="project-progress-box">
              <div className="project-progress-title">Tiến độ dự án Ariyana Lakeside Văn Quán</div>
              <div className="project-progress-section">
                <div className="project-progress-image-box">
                  <img src="/src/assets/images/ap5.jpg" />
                  <div className="project-progress-caption">Tiến độ dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
                </div>
                <div className="project-progress-image-box">
                  <img src="/src/assets/images/ap5.jpg" />
                  <div className="project-progress-caption">Tiến độ dự án Ariyana Lakeside Văn Quán (Hesco Văn Quán)</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="project-details-section-sidebar">
            <div className="project-details-download-box">
              <div className="project-details-download-title">Tải tài liệu và báo giá</div>
              <form>
                <div className="project-details-download-form">
                  <input type="text" placeholder="Họ và tên" className="project-details-input" />
                  <input type="email" placeholder="Email" className="project-details-input" />
                  <input type="text" placeholder="Số điện thoại" className="project-details-input" />
                </div>
                <button type="submit" className="project-details-btn">Đăng ký</button>
              </form>
            </div>
            <div className="project-details-toc-box">
              <div className="project-details-toc-title">Mục lục</div>
              <ul className="project-details-toc-list">
                <li><a href="#tongquan">Tổng quan dự án</a></li>
                <li><a href="#vitri">Vị trí</a></li>
                <li><a href="#tienich">Tiện ích</a></li>
                <li><a href="#tien_do">Tiến độ dự án <b>Ariyana Lakeside Văn Quán</b></a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section: Dự án lân cận */}
        <div className="nearby-projects-section">
          <div className="nearby-projects-header">
            <div className="nearby-projects-title">Dự án lân cận</div>
            <div className="related-title-nav">
              <button className="lr" onClick={() => carouselRef.current.prev()}><LeftOutlined /></button>
              <button className="lr" onClick={() => carouselRef.current.next()}><RightOutlined /></button>
            </div>
          </div>
          <Carousel ref={carouselRef} dots={false} infinite={false} slidesToShow={4} slidesToScroll={1}>
            {nearbyProjects.map((project) => (
              <div key={project.id} className="nearby-project-card">
                <div className="nearby-project-card-img-wrap">
                  <img src={project.image} alt={project.title} className="nearby-project-card-img" />
                </div>
                <div className="nearby-project-card-content">
                  <div className="nearby-project-card-title">{project.title}</div>
                  <div className="nearby-project-card-price">{project.price}</div>
                  <div className="nearby-project-card-details">
                    <span>{project.area}</span>
                    <span>{project.bedrooms}</span>
                    <span>{project.bathrooms}</span>
                  </div>
                  <div className="nearby-project-card-location">{project.location}</div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Message Button */}
      <button className="message-button" onClick={togglePopup}>
        <MessageOutlined />
      </button>

      {showPopup && currentPopupView === 'message' && (
        <MessagePopup showPopup={showPopup} togglePopup={togglePopup} onSwitchToChat={switchToChatView} />
      )}

      {showPopup && currentPopupView === 'chat' && (
        <ChatPopup showPopup={showPopup} togglePopup={togglePopup} onSwitchToMessage={switchToMessageView} />
      )}

    </div>
  );
};

export default ProjectDetailsPage;

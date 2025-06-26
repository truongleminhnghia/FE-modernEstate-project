import { useState } from "react";
import DemandContactForm from "./BaseForm";
import PropertyForm from "./PropertyForm";
import PackageForm from "./PackageForm";
import Confirm from "./Confirm";
import Success from "./Success";
import { Steps } from "antd";
import BreadcrumbComponent from "../../../components/ui/BreadcrumbComponent";
import AddressForm from "./AddressForm";
import CheckOut from "./CheckOut";
import axios from "axios";

function NewPost() {
    const [current, setCurrent] = useState(0);
    const [baseData, setBaseData] = useState({});
    const [propertyData, setPropertyData] = useState({});
    const [packageData, setPackageData] = useState({});
    const [addres, setAddresss] = useState({});

    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
    const userId = user.id || '';

    const onFinishFormBase = (values) => {
        setBaseData(values);
        setCurrent(1);
    }

    const onFinishPropertyData = (values) => {
        setPropertyData(values);
        setCurrent(2);
    }

    const onFinishAddressData = (values) => {
        setAddresss(values);
        setCurrent(3);
    }

    const onFinishPackageData = (values) => {
        setPackageData(values);
        setCurrent(4);
    }

    // const onConfirm = async () => {
    //     const payload = {
    //         postBy: userId,
    //         demand: baseData.demand,
    //         newProperty: {
    //             title: propertyData.title,
    //             description: propertyData.description,
    //             attribute: propertyData.attribute,
    //             type: propertyData.type,
    //             area: propertyData.area,
    //             areaUnit: propertyData.areaUnit,
    //             price: propertyData.price,
    //             priceUnit: "VND",
    //             document: ["Số đỏ", "sổ hồng"],
    //             interior: Array.isArray(propertyData.interior)
    //                 ? propertyData.interior.join(", ")
    //                 : String(propertyData.interior),
    //             numberOfBedrooms: propertyData.numberOfBedrooms,
    //             numberOfBathrooms: propertyData.numberOfBathrooms,
    //             houseDirection: propertyData.houseDirection,
    //             videoUrl: ["videoUrl"],
    //             address: {
    //                 houseNumber: addres.houseNumber,
    //                 street: addres.street,
    //                 ward: addres.ward,
    //                 district: addres.district,
    //                 city: addres.city,
    //                 country: "Việt Nam",
    //                 addressDetail: addres.addressDetail
    //             },
    //             projectId: propertyData.projectId && propertyData.projectId.length > 0
    //                 ? propertyData.projectId
    //                 : null,
    //             images: propertyData.images || ""
    //         },
    //         contact: {
    //             contactName: baseData?.contactName,
    //             contactEmail: baseData?.contactEmail,
    //             contactPhone: baseData?.contactPhone,
    //         },
    //         postPackagesRequest: {
    //             startDate: packageData.startDate,
    //             endDate: packageData.endDate,
    //             totalAmout: packageData.totalAmout,
    //             currency: packageData.currency,
    //             accountId: userId,
    //             packageId: packageData.packageId,
    //         },
    //     };
    //     try {
    //         // const res = await fetch(`${import.meta.env.VITE_API_URL}posts`, {
    //         //     method: "POST",
    //         //     payload,
    //         //     headers: {
    //         //         "Content-Type": "application/json",
    //         //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //         //     },
    //         // });

    //         const res = await axios.post(`${import.meta.env.VITE_API_URL}posts`,
    //             payload,
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //                 }
    //             })
    //         console.log(res);

    //         if (res.status === 200) {
    //             const data = await res.json();
    //             console.log('Post created successfully, data:', data);
    //             if (data && data.data && data.data.id) {
    //                 // Call payment link API
    //                 const paymentRes = await fetch(`${import.meta.env.VITE_API_URL}checkout/create-payment-link/${data.data.id}`, {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //                     },
    //                 });
    //                 if (paymentRes.ok) {
    //                     const paymentData = await paymentRes.json();
    //                     if (paymentData && paymentData.data && paymentData.data.url) {
    //                         window.location.href = paymentData.data.url;
    //                         return;
    //                     } else {
    //                         alert("Tạo bài đăng thành công, nhưng không nhận được link thanh toán.");
    //                     }
    //                 } else {
    //                     alert("Tạo bài đăng thành công, nhưng tạo link thanh toán thất bại.");
    //                 }
    //             } else {
    //                 alert("Tạo bài đăng thành công!");
    //             }
    //         } else {
    //             const data = await res.json();
    //             alert(data.title || data.message || "Có lỗi xảy ra khi tạo bài đăng!");
    //         }
    //     } catch (err) {
    //         alert("Có lỗi xảy ra khi gửi request!");
    //     }
    // }

    const onConfirm = async () => {
        const payload = {
            postBy: userId,
            demand: baseData.demand,
            newProperty: {
                title: propertyData.title,
                description: propertyData.description,
                attribute: propertyData.attribute,
                type: propertyData.type,
                area: propertyData.area,
                areaUnit: propertyData.areaUnit,
                price: propertyData.price,
                priceUnit: "VND",
                document: ["Số đỏ", "sổ hồng"],
                interior: Array.isArray(propertyData.interior)
                    ? propertyData.interior.join(", ")
                    : String(propertyData.interior),
                numberOfBedrooms: propertyData.numberOfBedrooms,
                numberOfBathrooms: propertyData.numberOfBathrooms,
                houseDirection: propertyData.houseDirection,
                videoUrl: ["videoUrl"],
                address: {
                    houseNumber: addres.houseNumber,
                    street: addres.street,
                    ward: addres.ward,
                    district: addres.district,
                    city: addres.city,
                    country: "Việt Nam",
                    addressDetail: addres.addressDetail
                },
                projectId:
                    propertyData.projectId && propertyData.projectId.length > 0
                        ? propertyData.projectId
                        : null,
                images: propertyData.images || ""
            },
            contact: {
                contactName: baseData?.contactName,
                contactEmail: baseData?.contactEmail,
                contactPhone: baseData?.contactPhone
            },
            postPackagesRequest: {
                startDate: packageData.startDate,
                endDate: packageData.endDate,
                totalAmout: packageData.totalAmout,
                currency: packageData.currency,
                accountId: userId,
                packageId: packageData.packageId
            }
        };

        try {
            // 1) Tạo post
            const postRes = await axios.post(
                `${import.meta.env.VITE_API_URL}posts`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const { status: postStatus, data: postData } = postRes;
            if (postStatus === 200 && postData.code === 200 && postData.success) {
                const newPostId = postData.data;

                // 2) Tạo payment link bằng Axios luôn
                const paymentRes = await axios.post(
                    `${import.meta.env.VITE_API_URL}checkout/create-payment-link/${newPostId}`,
                    {},  // body rỗng nếu API không cần thêm payload
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                const { status: payStatus, data: payData } = paymentRes;
                // Bây giờ chúng ta check payData.code
                if (payStatus === 200 && payData.code === 200 && payData.success) {
                    // payData.data chính là URL thanh toán
                    window.location.href = payData.data;
                    return;
                } else {
                    // Server đã trả về HTTP 200 nhưng payload.code != 200
                    alert(payData.message || "Tạo link thanh toán thất bại.");
                    return;
                }
            } else {
                // lỗi ở bước tạo post
                alert(postData.message || "Có lỗi xảy ra khi tạo bài đăng!");
            }
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra khi gửi request!");
        }
    };


    const items = [
        { title: "Nhu cầu & liên hệ" },
        { title: "Thông tin BĐS" },
        { title: "Địa Chỉ" },
        { title: "Gói đăng tin" },
        { title: "Xác Nhận" },
        { title: "Thanh Toán" },
    ];

    const forms = [
        <DemandContactForm onFinish={onFinishFormBase} initialValues={baseData} key="form1" />,
        <PropertyForm onFinish={onFinishPropertyData} initialValues={propertyData} key="form2" />,
        <AddressForm onFinish={onFinishAddressData} initialValues={addres} key="form3" />,
        <PackageForm onFinish={onFinishPackageData} initialValues={packageData} key="form4" />,
        <Confirm
            combined={{
                demand: baseData?.demand,
                newProperty: {
                    title: propertyData.title,
                    description: propertyData.description,
                    attribute: propertyData.attrs,
                    type: propertyData.type,
                    area: propertyData.area,
                    areaUnit: propertyData.areaUnit,
                    price: propertyData.price,
                    priceUnit: "VND",
                    document: ["Số đỏ", "sổ hồng"],
                    interior: propertyData.interior,
                    numberOfBedrooms: propertyData.numberOfBedrooms,
                    numberOfBathrooms: propertyData.numberOfBathrooms,
                    houseDirection: propertyData.houseDirection,
                    videoUrl: ["videoUrl"],
                    address: {
                        houseNumber: addres.houseNumber,
                        street: addres.street,
                        ward: addres.ward,
                        district: addres.district,
                        city: addres.city,
                        country: "Việt Nam",
                        addressDetail: addres.addressDetail
                    },
                    projectId: propertyData.projectId,
                    images: propertyData.files
                },
                contact: {
                    contactName: baseData?.contactName,
                    contactEmail: baseData?.contactEmail,
                    contactPhone: baseData?.contactPhone,
                },
                postPackagesRequest: packageData,
            }}
            onFinish={onConfirm}
            key="confirm"
        />,
        <CheckOut onAgain={() => {
            setCurrent(0);
            setDemandContact(null);
            setPropertyData(null);
            setPackageData(null);
        }} key="success" />,
    ]

    const breadcrumbItems = [
        { title: 'Trang chủ', href: '/' },
        { title: 'Thông tin cá nhân' }
    ];

    return (
        <div className="container">
            <BreadcrumbComponent items={breadcrumbItems} />
            <div className="mt-[30px]">
                <Steps
                    current={current}
                    items={items}
                />
                <div
                    style={{ marginTop: 50 }}>
                    {forms[current]}
                </div>
            </div>
        </div>
    );
}

export default NewPost;
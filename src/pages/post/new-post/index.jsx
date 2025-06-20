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
                projectId: propertyData.projectId || "",
                images: propertyData.images || ""
            },
            contact: {
                contactName: baseData?.contactName,
                contactEmail: baseData?.contactEmail,
                contactPhone: baseData?.contactPhone,
            },
            postPackagesRequest: packageData,
        };
        //call api
        console.log("request: ", payload)
        setCurrent(5);
    }

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
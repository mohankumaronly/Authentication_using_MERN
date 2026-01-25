import Button from "../../common/Button"
import CommonLayout from "../../layouts/CommonLayout"

const VerificationLinkPage = () => {
    const openEmailClient = () => {
        window.open('https://mail.google.com', '_blank')
    }

    return (
        <CommonLayout>
            <div className="space-y-4 flex items-center justify-center flex-col text-center">
                <h1 className="text-3xl font-bold">
                    Reset Password link has been sent
                </h1>
                <p className="text-gray-500">
                    Please check your inbox and click the reset password link.
                </p>

                <Button
                    text="Open Gmail"
                    type="button"
                    onClick={openEmailClient}
                />
            </div>
        </CommonLayout>
    )
}

export default VerificationLinkPage

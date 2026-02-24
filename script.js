let dangerCount = 0; 

function removeVietnameseTones(str) {
    return str.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
}

function analyzeMessage() {
    const rawMessage = document.getElementById("messageInput").value;
    const resultDiv = document.getElementById("result");

    const message = removeVietnameseTones(rawMessage.toLowerCase());

    let highRiskKeywords = [
        "chuyen tien",
        "otp",
        "xac nhan tai khoan",
        "trung thuong",
        "dong phi",
        "phi van chuyen",
        "nap tien",
        "nhan thuong"
    ];

    let mediumRiskKeywords = [
        "nhan qua",
        "viec lam luong cao",
        "link nay",
        "mien phi",
        "iphone"
    ];

    let score = 0;

    highRiskKeywords.forEach(keyword => {
        if (message.includes(keyword)) score += 2;
    });

    mediumRiskKeywords.forEach(keyword => {
        if (message.includes(keyword)) score += 1;
    });

    let resultText = "";
    let advice = "";

    if (score >= 3) {
        resultText = "🔴 NGUY CƠ CAO";
        advice = "❗ Có dấu hiệu lừa đảo. Không chuyển tiền, không cung cấp OTP.";
        resultDiv.style.color = "red";

        dangerCount++;
        document.getElementById("counter").innerText = dangerCount;

    } else if (score >= 1) {
        resultText = "🟡 NGHI NGỜ";
        advice = "⚠️ Tin nhắn có dấu hiệu bất thường. Kiểm tra kỹ trước khi phản hồi.";
        resultDiv.style.color = "orange";
    } else {
        resultText = "🟢 TẠM THỜI AN TOÀN";
        advice = "✅ Tuy nhiên vẫn nên cảnh giác.";
        resultDiv.style.color = "lightgreen";
    }

    resultDiv.innerHTML = `
        <h2>${resultText}</h2>
        <p>${advice}</p>
    `;
}

(function() {
    "use strict";

    var targetFieldCode = 'date1'; // 対象とするフィールドのフィールドコードを入力してください

    kintone.events.on('app.record.index.show', function(event) {
        var records = event.records;
        var currentDate = new Date();
        var twoMonthsLater = new Date();
        twoMonthsLater.setMonth(currentDate.getMonth() + 2);
        var nearExpirationCount = 0; // 車検が近い台車数

        for (var i = 0; i < records.length; i++) {
            var fieldValue = new Date(records[i][targetFieldCode].value);

            // 現在の日付から2か月以内の日付であればスタイルを変更
            if (isWithinTwoMonths(fieldValue, currentDate, twoMonthsLater)) {
                var cellElement = kintone.app.getFieldElements(targetFieldCode)[i];
                cellElement.style.backgroundColor = '#FF0000'; // 赤
                cellElement.style.color = 'black'; // 黒の文字色
                cellElement.style.fontWeight = 'bold'; // 太字
                nearExpirationCount++;
            }
        }

        // 車検が近い車両台数を表示
        var totalCountElement = document.createElement('div');
        totalCountElement.style.position = 'absolute';
        totalCountElement.style.top = '5px';
        totalCountElement.style.right = '300px'; // 左に10pxずらす
        totalCountElement.style.padding = '5px';
        totalCountElement.style.backgroundColor = 'blue'; // 黄色
	totalCountElement.style.border = '2px solid black'; // 黒い太枠
	totalCountElement.style.height = '30px'; // 高さを30pxに設定
        totalCountElement.style.fontWeight = 'bold';
        totalCountElement.textContent = '車検が近い車両台数: ' + nearExpirationCount +'台';
        kintone.app.getHeaderMenuSpaceElement().appendChild(totalCountElement);

        return event;
    });

    // 日付が指定された範囲内にあるかどうかを確認するヘルパー関数
    function isWithinTwoMonths(date, startDate, endDate) {
        return (
            date >= startDate &&
            date <= endDate
        );
    }
})();
